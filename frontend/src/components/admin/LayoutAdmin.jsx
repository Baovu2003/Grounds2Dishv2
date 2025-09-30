import Sidebar from "../Sidebar";

const LayoutAdmin = ({ children }) => {
    return (
        <div className="min-h-screen">
            <div className="flex">
                <Sidebar />

                <div className="flex-1 flex flex-col">

                    <div className="p-6 bg-indigo-100 rounded-lg flex justify-between items-center">
                        {/* Left */}
                        <div>
                            <h2 className="text-lg text-gray-800 flex items-center gap-2">
                                Hello, <span className="font-bold">Welcome back Admin</span> 👋
                            </h2>
                            <p className="text-sm text-gray-600">
                                Here’s what’s happening with your projects today:
                            </p>
                        </div>
                    </div>
                    <main className="flex-1 overflow-y-auto mt-5">{children}</main>
                </div>
            </div>
        </div>
    );
};
export default LayoutAdmin;
