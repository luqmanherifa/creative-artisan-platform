package models

import (
	"time"

	"gorm.io/gorm"
)

type ClientRequest struct {
	ID         uint           `gorm:"primaryKey"`
	ClientID   uint           `gorm:"not null"`
	CreatorID  uint           `gorm:"not null"`
	Title      string         `gorm:"size:255;not null"`
	Details    string         `gorm:"type:text"`
	Status     string         `gorm:"size:50;not null;default:'pending'"`
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  gorm.DeletedAt `gorm:"index"`
}
