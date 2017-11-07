const isTradeOpen = (x) => {
  if(x.BuyDate) {
    if(x.SellDate) {
      return "closed"
    } else {
      return "open"
    }
  } else {
    return "pend"
  }
}
  
// my @data = (
//   "BuyDate" => {
//     editable => yes,
//     formula => lsdkjf
//     },

//   }
// )
const PORTFOLIOSIZE = 100000;
const PORTFOLIORISK = 0.005;
const MAXHOLDINGSIZE = 24000;
const computeStopLoss = (x) => Math.round(x.Support * 0.98 *100) /100;
const computeRisk = (x) =>  Math.round( 100 * (x.Entry - computeStopLoss(x))) / 100;
const computeEstimatedShares = (x) => Math.floor(Math.min(PORTFOLIOSIZE*PORTFOLIORISK/computeRisk(x), MAXHOLDINGSIZE/x.Price));
const computeTradeCost = (x) => ((x.Share * x.Price) + x.Commis);
const computeGain = (x) => {
  if (x.SellDate) {
    return Math.round(100 * ( x.NumSold * x.SellPrice - x.SellCommis - computeTradeCost(x) ) / 100 );
  } else {
    return '';
  }
}
const computePctGain = (x) => {
  if( x.SellDate) {
    return Math.round( 100 * 100 * computeGain(x) / computeTradeCost(x)) / 100;
  } else {
    return '';
  }
}
  
const Formulae = {
  StockFormulae: {
    isTradeOpen: isTradeOpen,
    computeStopLoss: computeStopLoss,
    computeRisk: computeRisk,
    computeEstimatedShares: computeEstimatedShares,
    computeTradeCost: computeTradeCost,
    computeGain: computeGain,
    computePctGain: computePctGain
  }
}

const StockFormulae = Formulae.StockFormulae
export {StockFormulae}
export default Formulae