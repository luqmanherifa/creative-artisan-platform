package models

import (
	"time"

	"gorm.io/gorm"
)

type Creator struct {
	ID        uint           `gorm:"primaryKey"`
	UserID    uint           `gorm:"uniqueIndex;not null"`
	Bio       string         `gorm:"type:text"`
	Website   string         `gorm:"size:255"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
