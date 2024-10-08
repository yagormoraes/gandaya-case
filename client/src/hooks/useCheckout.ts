import axios from 'axios';

export const useCheckout = () => {
    const initiateCheckout = async () => {
        try {
            await axios.post("http://localhost:3001/checkout", { status: "in_progress" });
        } catch (error) {
            console.error("Erro ao iniciar o checkout:", error);
        }
    };

    const completeCheckout = async (): Promise<boolean> => {
        try {
            const response = await axios.post("http://localhost:3001/checkout");
            return response.data;
        } catch (error) {
            console.error("Erro ao completar o checkout:", error);
            return false;
        }
    };

    const failCheckout = async () => {
        try {
            await axios.post("http://localhost:3001/checkout", { status: "insufficient_funds" });
        } catch (error) {
            console.error("Erro ao marcar o checkout como falho:", error);
        }
    };

    const abandonCheckout = async () => {
        try {
            await axios.post("http://localhost:3001/checkout", { status: "abandoned" });
        } catch (error) {
            console.error("Erro ao marcar o checkout como abandonado:", error);
        }
    };

    return { initiateCheckout, completeCheckout, failCheckout, abandonCheckout };
};
