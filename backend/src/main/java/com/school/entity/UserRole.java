package com.school.entity;

public enum UserRole {
    ADMIN("Admin"),
    FINANCE("Finance");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
