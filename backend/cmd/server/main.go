package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/luqmanherifa/creative-artisan-platform/internal/config"
	"github.com/luqmanherifa/creative-artisan-platform/internal/database"
	"github.com/luqmanherifa/creative-artisan-platform/internal/handlers"
	"github.com/luqmanherifa/creative-artisan-platform/internal/middleware"
	"github.com/luqmanherifa/creative-artisan-platform/models"
)

func main() {
	cfg := config.Load()

	db, err := database.NewGorm(cfg.DB)
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	if err := db.AutoMigrate(&models.User{}, &models.Creator{}, &models.Artwork{}); err != nil {
		log.Fatalf("failed to migrate: %v", err)
	}
	log.Println("migration completed: users, creators, artworks")

	if err := db.AutoMigrate(&models.ClientRequest{}); err != nil {
		log.Fatalf("failed to migrate client requests: %v", err)
	}
	log.Println("migration completed: client requests")

	userHandler := handlers.NewUserHandler(db)
	authHandler := handlers.NewAuthHandler(db)
	creatorHandler := handlers.NewCreatorHandler(db)
	artworkHandler := handlers.NewArtworkHandler(db)

	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	mux.HandleFunc("/login", authHandler.Login)

	mux.Handle("/users", middleware.AuthMiddleware(
			http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
					switch r.Method {
					case http.MethodGet:
							userHandler.ListUsers(w, r)
					case http.MethodPost:
							userHandler.CreateUser(w, r)
					default:
							http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
					}
			}),
			[]string{"admin"},
	))

	mux.Handle("/user", middleware.AuthMiddleware(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method != http.MethodGet {
				http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
				return
			}
			userHandler.GetUser(w, r)
		}),
		[]string{"admin", "creator", "client"},
	))

	mux.Handle("/creators", middleware.AuthMiddleware(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				creatorHandler.ListCreators(w, r)
			case http.MethodPost:
				creatorHandler.CreateCreator(w, r)
			default:
				http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			}
		}),
		[]string{"admin", "creator"},
	))

	mux.Handle("/creator", middleware.AuthMiddleware(
		http.HandlerFunc(creatorHandler.GetCreator),
		[]string{"admin", "creator", "client"},
	))

	mux.Handle("/artworks", middleware.AuthMiddleware(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				artworkHandler.ListArtworks(w, r)
			case http.MethodPost:
				artworkHandler.CreateArtwork(w, r)
			default:
				http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			}
		}),
		[]string{"admin", "creator"},
	))

	mux.Handle("/artwork", middleware.AuthMiddleware(
		http.HandlerFunc(artworkHandler.GetArtwork),
		[]string{"admin", "creator", "client"},
	))

	requestHandler := handlers.NewClientRequestHandler(db)

	mux.Handle("/requests", middleware.AuthMiddleware(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				requestHandler.ListRequests(w, r)
			case http.MethodPost:
				requestHandler.CreateRequest(w, r)
			default:
				http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			}
		}),
		[]string{"client", "creator", "admin"},
	))

	mux.Handle("/request", middleware.AuthMiddleware(
		http.HandlerFunc(requestHandler.GetRequest),
		[]string{"client", "creator", "admin"},
	))

	mux.Handle("/request/status", middleware.AuthMiddleware(
		http.HandlerFunc(requestHandler.UpdateStatus),
		[]string{"creator", "admin"},
	))

	server := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: middleware.CORSMiddleware(mux),
	}

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("%s running on :%s", cfg.AppName, cfg.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	<-quit
	log.Println("shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("server forced to shutdown: %v", err)
	}

	log.Println("server exited properly")
}
