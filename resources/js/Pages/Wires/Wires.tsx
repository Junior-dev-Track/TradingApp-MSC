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
            <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Bank Account</h2>
                <div className="mb-4">
                    <strong>Balance: </strong>${balance.toFixed(2)}
                </div>
                <div className="mb-4">
                    <form onSubmit={(e) => { e.preventDefault(); handleDeposit(); }}>
                        <label htmlFor="depositAmount" className="block mb-2">Deposit:</label>
                        <input
                            type="text"
                            id="depositAmount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn btn-success mt-2  bg-darker-blue mt-4 rounded-lg px-6 py-2 font-semibold text-white ml-2"
                        >
                            Deposit
                        </button>
                    </form>
                </div>
                <div className="mb-4">
                    <form onSubmit={(e) => { e.preventDefault(); handleWithdraw(); }}>
                        <label htmlFor="withdrawAmount" className="block mb-2">Withdraw:</label>
                        <input
                            type="text"
                            id="withdrawAmount"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn btn-danger mt-2  bg-darker-blue mt-4 rounded-lg px-6 py-2 font-semibold text-white ml-2"
                        >
                            Withdraw
                        </button>
                    </form>
                </div>
                <div className="mt-6">
                    <h4 className="text-xl font-semibold mb-4">Payment methods</h4>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="cardNumber" className="block mb-2">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cardHolder" className="block mb-2">Cardholder Name</label>
                            <input
                                type="text"
                                id="cardHolder"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 mr-2">
                                <label htmlFor="expiryDate" className="block mb-2">Expiration Date</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <label htmlFor="cvv" className="block mb-2">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <h6 className="text-lg font-semibold mb-4">Billing Address</h6>
                        <div className="mb-4">
                            <label htmlFor="streetAddress" className="block mb-2">Street Address</label>
                            <input
                                type="text"
                                id="streetAddress"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="block mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 mr-2">
                                <label htmlFor="state" className="block mb-2">State/Province</label>
                                <input
                                    type="text"
                                    id="state"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <label htmlFor="zipCode" className="block mb-2">Zip code</label>
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
                                className="btn btn-primary bg-darker-blue mt-4 rounded-lg px-6 py-2 font-semibold text-white"
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
