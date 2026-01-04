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

	if err := db.AutoMigrate(&models.User{}); err != nil {
		log.Fatalf("failed to migrate: %v", err)
	}
	log.Println("migration completed: users table")

	userHandler := handlers.NewUserHandler(db)
	authHandler := handlers.NewAuthHandler(db)

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

	server := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: mux,
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
