export default [
    {   "name": "id",
        "type": "Integer",
        "pkey": true
    },
    {   "name": "Active",
        "type": "Derived",
        "formulaName": "isTradeOpen"
    },
    {   "name": "BuyDate",
        "type": "Date"
    },
    {   "name": "Symbol",
        "type": "String"
    },
    {   "name": "Notes",
        "type": "String"
    },
    {   "name": "Entry",
        "type": "Decimal"
    },
    {   "name": "Support",
        "type": "Decimal"
    },
    {   "name": "Target",
        "type": "Decimal"
    },
    {   "name": "SL",
        "type": "Derived",
        "formula": "computeStopLoss"
    },
    {   "name": "Risk",
        "type": "Derived",
        "formula": "computeRisk"
    },
    {   "name": "EstShares",
        "type": "Derived",
        "formula": "computeEstimatedShares"
    },
    {   "name": "Share",
        "type": "Integer"
    },
    {   "name": "Price",
        "type": "Decimal"
    },
    {   "name": "Commis",
        "type": "Decimal"
    },
    {   "name": "Total",
        "type": "Derived",
        "formula": "computeTradeCost"
    },
    {   "name": "SellDate",
        "type": "Date"
    },
    {   "name": "NumSold",
        "type": "Integer"
    },
    {   "name": "SellPrice",
        "type": "Decimal"
    },
    {   "name": "SellCommis",
        "type": "Decimal"
    },
    {   "name": "Gain",
        "type": "Derived",
        "formula": "computeGain"
    },
    {   "name": "PctGain",
        "type": "Derived",
        "formula": "computePctGain"
    }
]