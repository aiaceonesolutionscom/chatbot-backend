export function calculateTiles(params) {
    let roomAreaSqFt = params.totalAreaSqFt || 0;
    if (!roomAreaSqFt && params.lengthFeet && params.widthFeet) {
        roomAreaSqFt = params.lengthFeet * params.widthFeet;
    }
    if (roomAreaSqFt <= 0) {
        throw new Error('Room area or dimensions must be greater than zero.');
    }
    const wastagePercent = params.wastagePercent ?? 10; // 10% standard wastage allowance
    const wastageSqFt = Number(((roomAreaSqFt * wastagePercent) / 100).toFixed(2));
    const totalRequiredAreaSqFt = Number((roomAreaSqFt + wastageSqFt).toFixed(2));
    // Determine single tile size in sq ft if dimensions provided
    let tileAreaSqFt = 0;
    if (params.tileSizeInches) {
        tileAreaSqFt = (params.tileSizeInches.length * params.tileSizeInches.width) / 144;
    }
    const tilesNeeded = tileAreaSqFt > 0 ? Math.ceil(totalRequiredAreaSqFt / tileAreaSqFt) : 0;
    // Box packaging calculation
    const boxCoverageSqFt = params.boxCoverageSqFt || (tileAreaSqFt > 0 ? tileAreaSqFt * 4 : 16.0);
    const boxesNeeded = Math.ceil(totalRequiredAreaSqFt / boxCoverageSqFt);
    let estimatedTotalCost;
    let formattedEstimatedCost;
    if (params.boxPrice && params.boxPrice > 0) {
        estimatedTotalCost = Number((boxesNeeded * params.boxPrice).toFixed(2));
        formattedEstimatedCost = `$${estimatedTotalCost.toFixed(2)}`;
    }
    const breakdown = `Room Area: ${roomAreaSqFt} sq ft | Wastage (${wastagePercent}%): +${wastageSqFt} sq ft | Total Area: ${totalRequiredAreaSqFt} sq ft | Boxes Needed: ${boxesNeeded} boxes (coverage: ${boxCoverageSqFt} sq ft/box)${formattedEstimatedCost ? ` | Estimated Total: ${formattedEstimatedCost}` : ''}`;
    return {
        roomAreaSqFt,
        wastageSqFt,
        totalRequiredAreaSqFt,
        tilesNeeded,
        boxesNeeded,
        boxCoverageSqFt,
        estimatedTotalCost,
        currency: 'USD',
        formattedEstimatedCost,
        breakdown
    };
}
