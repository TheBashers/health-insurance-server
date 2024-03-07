function calculateRiskScores(
    age,
    lbs,
    feet,
    inches,
    systolic,
    diastolic,
    isFamilyHistoryCancer,
    isFamilyHistoryAlzheimers,
    isFamilyHistoryDiabetes
) {
    const agePoints = calculateAgePoints(age);
    const bmiPoints = calculateBmiPoints(lbs, feet, inches);
    const bloodPressurePoints = calculateBloodPressurePoints(systolic, diastolic);
    const familyDiseasePoints = calculateFamilyDiseasePoints(
        isFamilyHistoryCancer,
        isFamilyHistoryAlzheimers,
        isFamilyHistoryDiabetes
    );
 
    const totalPoints = agePoints + bmiPoints + bloodPressurePoints + familyDiseasePoints;

    let riskCategory = '';
    if (totalPoints <= 20) {
        riskCategory = 'low risk';
    }
    else if (totalPoints <= 50) {
        riskCategory = 'moderate risk';
    }
    else if (totalPoints <= 75) {
        riskCategory = 'high risk';
    }
    else {
        riskCategory = 'uninsurable';
    }

    const coverageRisks = {
        riskCategory: riskCategory,
        totalPoints: totalPoints,
        agePoints: agePoints,
        bmiPoints: bmiPoints,
        bloodPressurePoints: bloodPressurePoints,
        familyDiseasePoints: familyDiseasePoints,
    };

    return coverageRisks;
}

function calculateAgePoints(age) {
    if (age < 30) {
        return 0;
    } else if (age < 45) {
        return 10;
    } else if (age < 60) {
        return 20;
    } else {
        return 30;
    }
}

function calculateBmiPoints(lbs, feet, inches) {
    const kilograms = lbs * 0.453592;
    const meters = (feet * 12 + inches) * 0.0254;
    const bmi = kilograms / (meters * meters);
    if (bmi < 18.5) {
        return 10;
    } else if (bmi < 25) {
        return 0;
    } else if (bmi < 30) {
        return 30;
    } else {
        return 75;
    }
}

function calculateBloodPressurePoints(systolic, diastolic) {
    if (systolic < 120 && diastolic < 80) {
        return 0;
    } 
    else if ((systolic >= 120 && systolic < 130) && diastolic < 80) {
        return 15;
    } 
    else if (
        (systolic >= 130 && systolic < 139) ||
        (diastolic >= 80 && diastolic < 89)
    ) {
        return 30;
    } 
    else if (systolic >= 140 || diastolic >= 90) {
        return 75;
    } 
    else if (systolic >= 180 || diastolic >= 120) {
        return 100;
    }
}

function calculateFamilyDiseasePoints(
    isFamilyHistoryCancer,
    isFamilyHistoryAlzheimers,
    isFamilyHistoryDiabetes
) {
    let points = 0;
    if (isFamilyHistoryCancer) {
        points += 10;
    }
    if (isFamilyHistoryAlzheimers) {
        points += 10;
    }
    if (isFamilyHistoryDiabetes) {
        points += 10;
    }
    return points;
}

module.exports = { calculateRiskScores };