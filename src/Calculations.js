import React, { useState } from 'react';

export function Monthly(aprAmount, loanTerm, loanAmount) {
    let princ = loanAmount;
    let term  = loanTerm;
    let intr   = aprAmount / 1200;
    let monthly = princ * intr / (1 - (Math.pow(1/(1 + intr), term)));

    return parseFloat(monthly).toFixed(2);
}

export function TotalCost(aprAmount, loanTerm, loanAmount) {
    let princ = loanAmount;
    let term  = loanTerm;
    let intr   = aprAmount / 1200;
    let monthly = princ * intr / (1 - (Math.pow(1/(1 + intr), term)));

    let totalCost = monthly * loanTerm;

    return parseFloat(totalCost).toFixed(2);
}

export function TotalInterest(aprAmount, loanTerm, loanAmount) {
    let princ = loanAmount;
    let term  = loanTerm;
    let intr   = aprAmount / 1200;
    let monthly = princ * intr / (1 - (Math.pow(1/(1 + intr), term)));

    let totalInterest = (monthly * loanTerm) -  loanAmount;
    return parseFloat(totalInterest).toFixed(2);
}

export function CostPerYear(monthly) {
    let total = monthly * 12;

    return parseFloat(total).toFixed(2);
}