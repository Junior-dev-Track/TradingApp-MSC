import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";

interface WiresPageProps {
    wallet: number;
    auth?: {
        user?: User; // Marquer la propriété 'user' comme optionnelle
    };
}

const WiresPage: React.FC<WiresPageProps> = ({ wallet, auth }) => {
    const [balance, setBalance] = useState<number>(wallet);
    const [depositAmount, setDepositAmount] = useState<string>("");
    const [withdrawAmount, setWithdrawAmount] = useState<string>("");

    const handleDeposit = () => {
        const amount = parseFloat(depositAmount);
        if (amount > 0) {
            const response: any = router.post(`/wires/deposit`);
            setBalance(balance + amount);
            setDepositAmount("");
        } else {
            alert("Please enter a positive amount to deposit.");
        }
    };

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (amount > 0) {
            if (amount <= balance) {
                const response: any = router.post(`/wires/withdraw`);
                setBalance(balance - amount);
                setWithdrawAmount("");
            } else {
                alert("Insufficient funds.");
            }
        } else {
            alert("Please enter a positive amount to withdraw.");
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
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
            </div>
        </AuthenticatedLayout>
    );
};

export default WiresPage;
