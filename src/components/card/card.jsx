import { useState } from "react";
// import "dotenv/config";
import { BridgeKit } from "@circle-fin/bridge-kit";
import { createAdapterFromPrivateKey } from "@circle-fin/adapter-viem-v2";
//import { inspect } from "util";

const card = () => {
    const kit = new BridgeKit();

    const [leftchain, setLeftChain] = useState("");
    const [rightchain, setRightChain] = useState("");
    const [inputvalue, setInputvalue] = useState("")
     const chains = [
    { name: "Ethereum Sepolia", key: "Ethereum_Sepolia", chainId: 11155111 },
    { name: "Base Sepolia",     key: "Base_Sepolia",     chainId: 84532 },
    { name: "Polygon Amoy",     key: "Polygon_Amoy",     chainId: 80001 },
    { name: "Arbitrum Sepolia", key: "Arbitrum_Sepolia", chainId: 421614 },
  ];

    const bridgeUSDC = async (fromchain, tochain, amount) => {
        try {
            const adapter = createAdapterFromPrivateKey({
                privateKey: "cebbf09768973f1cba34065b384eaadd6034e954f14a5de7c5fa7d494b2d7024",
            });

            console.log("---------------Starting Bridging---------------");

            const result = await kit.bridge({
                from: { adapter, chain: fromchain },
                to: { adapter, chain: tochain },
                amount: amount.toString(),
            });
            console.log("RESULT", inspect(result, false, null, true));
            alert("Bridge Submitted Successfully!");
        } catch (err) {
            console.log("ERROR", inspect(err, false, null, true));
            alert("Bridge Failed — Check console");
        }
    };
    const handleSubmit = () => {
        if (!leftchain || !rightchain) {
            alert("Select both chains");
            return;
        }

        if (leftchain === rightchain) {
            alert("Please select different chains for bridging.");
            return;
        }

        if (!inputvalue) {
            alert("Enter amount");
            return;
        }

        bridgeUSDC(leftchain, rightchain, inputvalue);

        setInputvalue("");
        setLeftChain("");
        setRightChain("");
    };
    return (
        <>
            <div className="card-main-container">
                <div className="card-container">
                    <div className="card-title">
                        <h3>Bridge</h3>
                        <h4>time</h4>
                        <h5>setting</h5>
                    </div>
                    <div className="dropdown-container">
                        <div className="dropdown-left">
                            <p>left select</p>
                            <select value={leftchain} onChange={(e) => setLeftChain(e.target.value)} >
                                {chains.map((c) => (
                                    <option key={c.chainId} value={c.key}>{c.name}</option>
                                ))}
                                {console.log(leftchain)}
                            </select>
                        </div>
                        <div className="dropdown-right">
                            <p>right select</p>
                            <select value={rightchain} onChange={(e) => setRightChain(e.target.value)}>
                                {chains.map((c) => (
                                    <option key={c.chainId} value={c.key}>{c.name}</option>
                                ))}
                                {console.log(rightchain)}
                            </select>
                        </div>
                        {/* {leftchain && rightchain && leftchain === rightchain && (
                            alert("Please select different chains for bridging.")
                        )} */}
                    </div>
                    <div className="value-input">
                        <input type="text" value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} />
                        {console.log(inputvalue)}
                    </div>
                    <div className="submit-container">
                        <button onClick={handleSubmit}>submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default card;