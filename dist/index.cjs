function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $80bd448eb6ea085b$export$2e2bcd8739ae039);
function $80bd448eb6ea085b$export$2e2bcd8739ae039(deltas) {
    const deltasByTransactionId = $80bd448eb6ea085b$var$getDeltasMappedToTransactionId(deltas);
    const history = Array.from(deltasByTransactionId.values()).map($80bd448eb6ea085b$var$getListItem);
    console.log(history);
    return history;
}
/**
 *
 * @param deltas Address deltas from the same transaction
 */ function $80bd448eb6ea085b$var$getListItem(deltas) {
    //Very simple if only one delta, like you received two LEMONADE tokens
    if (deltas.length === 1) {
        const delta = deltas[0];
        const item = {
            isSent: delta.satoshis < 0,
            assets: [
                {
                    assetName: delta.assetName,
                    value: delta.satoshis / 1e8,
                    satoshis: delta.satoshis
                }
            ],
            blockHeight: delta.height,
            transactionId: delta.txid
        };
        return item;
    } else {
        const temp = {};
        deltas.map((delta)=>{
            temp[delta.assetName] = temp[delta.assetName] || 0;
            temp[delta.assetName] += delta.satoshis;
        });
        let isSent = false;
        const assets = Object.keys(temp).map((name)=>{
            //If any of the values is negative, it means we have sent
            if (temp[name] < 0) isSent = true;
            const obj = {
                assetName: name,
                satoshis: temp[name],
                value: temp[name] / 1e8
            };
            return obj;
        });
        const listItem = {
            assets: assets,
            blockHeight: deltas[0].height,
            transactionId: deltas[0].txid,
            isSent: isSent
        };
        return listItem;
    }
}
function $80bd448eb6ea085b$var$getDeltasMappedToTransactionId(deltas) {
    const map = new Map();
    deltas.map((delta)=>{
        const arr = map.get(delta.txid) || [];
        arr.push(delta);
        map.set(delta.txid, arr);
    });
    return map;
}


//# sourceMappingURL=index.cjs.map