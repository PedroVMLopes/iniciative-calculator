export default function Generator() {
    return (
        <div className="flex flex-col justify-center items-center my-6 w-full bg-[var(--cinza-medio)] rounded-md p-1 shadow-xl font-sans">
            <div className="flex flex-col justify-center items-center w-full bg-[var(--cinza-escuro)] rounded-md p-6">
                <h1 className="text-xl">Gerador</h1>
                <input
                    type="range"
                    min="0"
                    max="100"
                    className={`w-full h-2 mt-4 bg-[var(--cinza-medio)] rounded-lg appearance-none cursor-pointer`}
                />
            </div>
        </div>
    )
}