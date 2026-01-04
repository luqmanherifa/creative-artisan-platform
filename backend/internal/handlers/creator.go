package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/luqmanherifa/creative-artisan-platform/models"
	"gorm.io/gorm"
)

type CreatorHandler struct {
	DB *gorm.DB
}

func NewCreatorHandler(db *gorm.DB) *CreatorHandler {
	return &CreatorHandler{DB: db}
}

func (h *CreatorHandler) CreateCreator(w http.ResponseWriter, r *http.Request) {
	var input struct {
		UserID  uint   `json:"user_id"`
		Bio     string `json:"bio"`
		Website string `json:"website"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "invalid input", http.StatusBadRequest)
		return
	}

	creator := models.Creator{
		UserID:  input.UserID,
		Bio:     input.Bio,
		Website: input.Website,
	}

	if err := h.DB.Create(&creator).Error; err != nil {
		http.Error(w, "failed to create creator", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(creator)
}

func (h *CreatorHandler) ListCreators(w http.ResponseWriter, r *http.Request) {
	var creators []models.Creator
	if err := h.DB.Find(&creators).Error; err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(creators)
}

func (h *CreatorHandler) GetCreator(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	id, _ := strconv.Atoi(idStr)

	var creator models.Creator
	if err := h.DB.First(&creator, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			http.Error(w, "creator not found", http.StatusNotFound)
			return
		}
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(creator)
}
