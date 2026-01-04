package models

import (
	"time"

	"gorm.io/gorm"
)

type Artwork struct {
	ID        uint           `gorm:"primaryKey"`
	CreatorID uint           `gorm:"index;not null"`
	Title     string         `gorm:"size:255;not null"`
	Description string       `gorm:"type:text"`
	MediaURL  string         `gorm:"size:255"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
