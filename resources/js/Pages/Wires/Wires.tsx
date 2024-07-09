import React, { useState } from "react";
import { router } from "@inertiajs/react";

interface WiresPageProps {
    wallet: number;
}

const WiresPage: React.FC<WiresPageProps> = ({ wallet }) => {
    const [balance, setBalance] = useState<number>(wallet);
    const [depositAmount, setDepositAmount] = useState<string>("");
    const [withdrawAmount, setWithdrawAmount] = useState<string>("");

    const [status, setStatus] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleDeposit = async () => {
        const amount = parseFloat(depositAmount);
        if (amount > 0) {
            try {
                const response = router.post(`/wires/deposit`, {
                    amount,
                });
                setDepositAmount("");
                setStatus("Deposit successful!");
                router.visit("/wires", {
                    only: ["wallet"],
                });
            } catch (error) {
                setError(
                    "An error occurred while depositing funds. Please try again later."
                );
            }
        } else {
            alert("Please enter a positive amount to deposit.");
        }
    };

    const handleWithdraw = async () => {
        const amount = parseFloat(withdrawAmount);
        if (amount > 0) {
            if (amount <= balance) {
                try {
                    const response = router.post(`/wires/withdraw`, {
                        amount,
                    });
                    setWithdrawAmount("");
                    setStatus("Withdrawal successful!");
                    router.visit("/wires", {
                        only: ["wallet"],
                    });
                } catch (error) {
                    setError(
                        "An error occurred while withdrawing funds. Please try again later."
                    );
                }
            } else {
                alert("Insufficient funds.");
            }
        } else {
            alert("Please enter a positive amount to withdraw.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Bank Account</h2>
            <div style={{ marginBottom: "20px" }}>
                <strong>Balance: </strong>${balance.toFixed(2)}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <form onSubmit={handleDeposit}>
                    <label htmlFor="depositAmount">Deposit: </label>
                    <input
                        type="text"
                        id="depositAmount"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        style={{
                            marginLeft: "10px",
                            padding: "5px",
                            width: "200px",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            marginLeft: "10px",
                            padding: "5px 10px",
                            background: "green",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        Deposit
                    </button>
                </form>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <form onSubmit={handleWithdraw}>
                    <label htmlFor="withdrawAmount">Withdraw: </label>
                    <input
                        type="text"
                        id="withdrawAmount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        style={{
                            marginLeft: "10px",
                            padding: "5px",
                            width: "200px",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            marginLeft: "10px",
                            padding: "5px 10px",
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        Withdraw
                    </button>
                </form>
            </div>
            {status && (
                <div style={{ color: "green" }}>
                    <strong>{status}</strong>
                </div>
            )}
            {error && (
                <div style={{ color: "red" }}>
                    <strong>{error}</strong>
                </div>
            )}
        </div>
    );
};

export default WiresPage;
