// import { useState } from "react";
// // import "dotenv/config";
// import { BridgeKit } from "@circle-fin/bridge-kit";
// import { createAdapterFromPrivateKey } from "@circle-fin/adapter-viem-v2";
// import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
// //import { inspect } from "util";

// const card = () => {
//     const kit = new BridgeKit();
//     const { address } = useAppKitAccount();
//     const { walletProvider } =useAppKitProvider("eip155");

//     const [leftchain, setLeftChain] = useState("");
//     const [rightchain, setRightChain] = useState("");
//     const [inputvalue, setInputvalue] = useState("")
//      const chains = [
//     { name: "Ethereum Sepolia", key: "Ethereum_Sepolia", chainId: 11155111 },
//     { name: "Base Sepolia",     key: "Base_Sepolia",     chainId: 84532 },
//     { name: "Polygon Amoy",     key: "Polygon_Amoy",     chainId: 80001 },
//     { name: "Arbitrum Sepolia", key: "Arbitrum_Sepolia", chainId: 421614 },
//   ];

//     const bridgeUSDC = async (fromchain, tochain, amount) => {
//         try {
//             const adapter = createAdapterFromPrivateKey({
//                 privateKey: walletProvider.toString(),
//             });

//             console.log("---------------Starting Bridging---------------");

//             const result = await kit.bridge({
//                 from: { adapter, chain: fromchain },
//                 to: { adapter, chain: tochain },
//                 amount: amount.toString(),
//             });
//             // console.log("RESULT", inspect(result, false, null, true));
//             alert("Bridge Submitted Successfully!");

//         } catch (err) {
//             console.error("Bridging Error:", err);
//             // console.log("ERROR", inspect(err, false, null, true));
//             alert("Bridge Failed — Check console");
//         }
//     };
//     const handleSubmit = () => {
//         if (!leftchain || !rightchain) {
//             alert("Select both chains");
//             return;
//         }

//         if (leftchain === rightchain) {
//             alert("Please select different chains for bridging.");
//             return;
//         }

//         if (!inputvalue) {
//             alert("Enter amount");
//             return;
//         }

//         bridgeUSDC(leftchain, rightchain, inputvalue);

//         setInputvalue("");
//         setLeftChain("");
//         setRightChain("");
//     };
//     return (
//         <>
//             <div className="card-main-container">
//                 <div className="card-container">
//                     <div className="card-title">
//                         <h3>Bridge</h3>
//                         <h4>time</h4>
//                         <h5>setting</h5>
//                     </div>
//                     <div className="dropdown-container">
//                         <div className="dropdown-left">
//                             <p>left select</p>
//                             <select value={leftchain} onChange={(e) => setLeftChain(e.target.value)} >
//                                 {chains.map((c) => (
//                                     <option key={c.chainId} value={c.key}>{c.name}</option>
//                                 ))}
//                                 {console.log(leftchain)}
//                             </select>
//                         </div>
//                         <div className="dropdown-right">
//                             <p>right select</p>
//                             <select value={rightchain} onChange={(e) => setRightChain(e.target.value)}>
//                                 {chains.map((c) => (
//                                     <option key={c.chainId} value={c.key}>{c.name}</option>
//                                 ))}
//                                 {console.log(rightchain)}
//                             </select>
//                         </div>
//                         {/* {leftchain && rightchain && leftchain === rightchain && (
//                             alert("Please select different chains for bridging.")
//                         )} */}
//                     </div>
//                     <div className="value-input">
//                         <input type="text" value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} />
//                         {console.log(inputvalue)}
//                     </div>
//                     <div className="submit-container">
//                         <button onClick={handleSubmit}>submit</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default card;





import { useState, useEffect } from "react";
import { BridgeKit } from "@circle-fin/bridge-kit";
import { createAdapterFromProvider } from "@circle-fin/adapter-viem-v2";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";

const kit = new BridgeKit();

const Card = () => {
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");

    const [adapter, setAdapter] = useState(null);
    const [leftchain, setLeftChain] = useState("");
    const [rightchain, setRightChain] = useState("");
    const [inputvalue, setInputvalue] = useState("");

    const chains = [
        { name: "Ethereum Sepolia", key: "Ethereum_Sepolia", chainId: 11155111 },
        { name: "Base Sepolia", key: "Base_Sepolia", chainId: 84532 },
        { name: "Polygon Amoy", key: "Polygon_Amoy", chainId: 80001 },
        { name: "Arbitrum Sepolia", key: "Arbitrum_Sepolia", chainId: 421614 },
    ];

    useEffect(() => {
        const initAdapter = async () => {
            if (!walletProvider) return;

            const a = await createAdapterFromProvider({
                provider: walletProvider, // Reown ka wallet provider
            });

            setAdapter(a);
        };

        initAdapter();
    }, [walletProvider]);

    const bridgeUSDC = async (fromchain, tochain, amount) => {
        try {
            if (!isConnected || !address) {
                alert("Pehle wallet connect karo");
                return;
            }

            if (!adapter) {
                alert("Adapter ready nahi hai, thodi der baad try karo");
                return;
            }

            console.log("---------------Starting Bridging---------------");

            const result = await kit.bridge({
                from: { adapter, chain: fromchain },
                to: {
                    adapter,
                    chain: tochain,
                    recipientAddress: address, // optional, same wallet pe receive
                },
                amount: amount.toString(),
            });

            console.log("RESULT", result);
            alert("Bridge Submitted Successfully!");
        } catch (err) {
            console.error("Bridge error:", err);
            alert("Bridge Failed — console check karo");
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
                        <select
                            value={leftchain}
                            onChange={(e) => setLeftChain(e.target.value)}
                        >
                            <option value="">Select chain</option>
                            {chains.map((c) => (
                                <option key={c.chainId} value={c.key}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="dropdown-right">
                        <p>right select</p>
                        <select
                            value={rightchain}
                            onChange={(e) => setRightChain(e.target.value)}
                        >
                            <option value="">Select chain</option>
                            {chains.map((c) => (
                                <option key={c.chainId} value={c.key}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="value-input">
                    <input
                        type="text"
                        value={inputvalue}
                        onChange={(e) => setInputvalue(e.target.value)}
                    />
                </div>

                <div className="submit-container">
                    <button onClick={handleSubmit}>submit</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
