package com.school.entity;

public enum PaymentStatus {
    PAID("Paid"),
    UNPAID("Unpaid");

    private final String displayName;

    PaymentStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
