package com.school.entity;

public enum StudentType {
    DAY_SCHOLAR("Day Scholar"),
    HOSTLER("Hostler");

    private final String displayName;

    StudentType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
