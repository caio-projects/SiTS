/**
 * Predicts steady-state creep rate using Norton's Power Law
 * @param {number} stress - Applied stress (MPa)
 * @param {number} tempK - Temperature (Kelvin)
 * @param {object} materialParams - {A: preExponential, n: stressExponent, Q: activationEnergyJ}
 * @returns {number} - Creep rate (1/s)
 */
function calculateCreepRate(stress, tempK, materialParams) {
    const R = 8.314; // Gas constant
    const exponent = -materialParams.Q / (R * tempK);
    return materialParams.A * Math.pow(stress, materialParams.n) * Math.exp(exponent);
}

/**
 * Predicts failure time using Larson-Miller Parameter (LMP)
 * @param {number} stress - Applied stress (MPa)
 * @param {number} tempK - Temperature (Kelvin)
 * @param {function} lmpFormula - Formula: c = T(log(tr) + C) * 10^-3
 * @returns {number} - Predicted time to failure (hours)
 */
function predictFailureTime(stress, tempK, lmpFormula) {
    // Simplified: Suppose LMP formula is pre-defined for material
    const lmpValue = lmpFormula(stress); 
    return Math.pow(10, ( (lmpValue * 1000) / tempK) - 20); // Example C=20
}

// Example usage to compare materials
const materialA = { A: 1e-10, n: 4.5, Q: 250000 };
const stress = 150; // MPa
const temp = 1000; // Kelvin

const rateA = calculateCreepRate(stress, temp, materialA);
console.log(`Material A Creep Rate: ${rateA} /s`);

// Optimization: Find minimum rate among materials
const materials = [
    { name: "Superalloy X", params: { A: 1e-10, n: 4.5, Q: 250000 } },
    { name: "Titanium Alloy", params: { A: 1e-8, n: 5.0, Q: 200000 } }
];

let bestMaterial = null;
let minRate = Infinity;

materials.forEach(mat => {
    let rate = calculateCreepRate(stress, temp, mat.params);
    if (rate < minRate) {
        minRate = rate;
        bestMaterial = mat.name;
    }
});
console.log(`Optimal Material: ${bestMaterial} with rate ${minRate}`);