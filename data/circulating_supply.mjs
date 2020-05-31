const { format, subDays, subMonths } = fns;

const firstYearIssuance = [
  ['D.D.', 18637972],
  ['1st month', 18804639],
  ['2nd month', 18971305],
  ['3rd month', 24933156],
  ['4th month', 32151407],
  ['5th month', 39369658],
  ['6th month', 45331509],
  ['7th month', 52549760],
  ['8th month', 59471611],
  ['9th month', 67649862],
  ['10th month', 74571713],
  ['11th month', 82749964],
];

const subsequentIssuance = [
  ['EOY 1', 89671815]
  ['EOY 2', 148771615],
  ['EOY 3', 230371615],
  ['EOY 4', 264571615],
  ['EOY 5', 297571615],
  ['EOY 6', 330571615],
  ['EOY 7', 339571615],
  ['EOY 8', 348571615],
  ['EOY 9', 357571615],
  ['EOY 10', 372571615],
];

export default async function () {
  return {
    firstYearIssuance,
    subsequentIssuance,
  };
}
