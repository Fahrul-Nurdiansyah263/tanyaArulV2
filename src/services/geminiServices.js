import {GoogleGenerativeAI} from "@google/generative-ai";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const FALLBACK_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
];

async function fileToGenerativePart(file) {
    const based64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inline_data: {data:await based64EncodedDataPromise, mime_type: file.type},
    };
}

function isRetryableError(error) {
    const msg = error.message || "";
    return (
        msg.includes("503") ||
        msg.includes("high demand") ||
        msg.includes("overloaded") ||
        msg.includes("429") ||
        msg.includes("quota") ||
        msg.includes("404") ||
        msg.includes("not found")
    );
}

export async function generativeContentStream(prompt, imageFile){
    if(!prompt && !imageFile){
        throw new Error("Mohon berikan prompt atau gambar.");
    }
    const parts = [];
    if (imageFile) {
        const imagePart = await fileToGenerativePart(imageFile);
        parts.push(imagePart);
    }
    if (prompt) {
        parts.push({text:prompt});
    }
    const contents = [{role: 'user', parts}];

    let lastError;
    for (const modelName of FALLBACK_MODELS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContentStream({contents});
            return result;
        } catch (error) {
            lastError = error;
            if (isRetryableError(error)) {
                continue;
            }
            throw error;
        }
    }
    const quotaError = new Error("QUOTA_EXHAUSTED");
    quotaError.type = "QUOTA_EXHAUSTED";
    throw quotaError;

}
