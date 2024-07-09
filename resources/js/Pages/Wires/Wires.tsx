import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";

interface WiresPageProps {
    wallet: number;
    auth?: {
        user?: User;
    };
}

const WiresPage: React.FC<WiresPageProps> = ({ wallet, auth }) => {
    const [balance, setBalance] = useState<number>(wallet);
    const [depositAmount, setDepositAmount] = useState<string>("");
    const [withdrawAmount, setWithdrawAmount] = useState<string>("");

    const [status, setStatus] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleDeposit = async () => {
        const amount = parseFloat(depositAmount);
        if (amount > 0) {
            try {
                const response = await router.post(`/wires/deposit`, {
                    amount,
                });
                setBalance(balance + amount);
                setDepositAmount("");
                setStatus("Deposit successful!");
            } catch (error) {
                setError(
                    "An error occurred while depositing funds. Please try again later."
                );
                console.error("Deposit error:", error);
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
                    const response = await router.post(`/wires/withdraw`, {
                        amount,
                    });
                    setBalance(balance - amount);
                    setWithdrawAmount("");
                    setStatus("Withdrawal successful!");
                } catch (error) {
                    setError(
                        "An error occurred while withdrawing funds. Please try again later."
                    );
                    console.error("Withdrawal error:", error);
                }
            } else {
                alert("Insufficient funds.");
            }
        } else {
            alert("Please enter a positive amount to withdraw.");
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <div className="container mx-auto p-4 bg-gray-700 rounded-lg shadow-md max-w-6xl">
                <h2 className="text-2xl text-white font-semibold mb-4">Bank Account</h2>
                <div className="mb-4 text-white">
                    <strong>Balance: </strong>${balance.toFixed(2)}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 ">
                    <form onSubmit={(e) => { e.preventDefault(); handleDeposit(); }}>
                        <label htmlFor="depositAmount" className="block mb-2 text-white">Deposit:</label>
                        <input
                            type="number"
                            id="depositAmount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn btn-success bg-darker-blue text-white rounded-lg px-4 py-2 font-semibold ml-2 "
                        >
                            Deposit
                        </button>
                    </form>
                    <form onSubmit={(e) => { e.preventDefault(); handleWithdraw(); }}>
                        <label htmlFor="withdrawAmount" className="block mb-2 text-white">Withdraw:</label>
                        <input
                            type="number"
                            id="withdrawAmount"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn btn-danger bg-darker-blue text-white rounded-lg px-4 py-2 font-semibold ml-2 "
                        >
                            Withdraw
                        </button>
                    </form>
                </div>
                <div className="mt-6">
                    <h4 className="text-xl text-white font-semibold mb-4">Payment methods</h4>
                    <form>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="cardNumber" className="block mb-2 text-white">Card Number:</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cardHolder" className="block mb-2 text-white">Cardholder Name:</label>
                                <input
                                    type="text"
                                    id="cardHolder"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="expiryDate" className="block mb-2 text-white">Expiration Date:</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block mb-2 text-white">CVV:</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <h6 className="text-lg text-white font-semibold mb-4 text-white">Billing Address</h6>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="streetAddress" className="block mb-2 text-white">Street Address:</label>
                                <input
                                    type="text"
                                    id="streetAddress"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block mb-2 text-white">City:</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="state" className="block mb-2 text-white">State/Province:</label>
                                <input
                                    type="text"
                                    id="state"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="zipCode" className="block mb-2 text-white">Zip code:</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary bg-darker-blue text-white rounded-lg px-4 py-2 font-semibold "
                            >
                                Pay Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default WiresPage;
