import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sun, Moon, Sunrise, Sunset, Cloud } from "lucide-react";

export default function DynamicGreating() {
    const [greeting, setGreeting] = useState("");
    const [icon, setIcon] = useState(null);
    const token = localStorage.getItem("token");

    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await fetch("/auth/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch user data");
            return response.json();
        },
    });

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 7) {
            setGreeting("Good Morning");
            setIcon(<Sunrise size={28} />);
        } else if (currentHour < 12) {
            setGreeting("Good Morning");
            setIcon(<Sun size={28} />);
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon");
            setIcon(<Sun size={28} />);
        } else if (currentHour < 20) {
            setGreeting("Good Evening");
            setIcon(<Sunset size={28} />);
        } else {
            setGreeting("Good Night");
            setIcon(<Moon size={28} />);
        }
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <h1 className="flex items-center text-[#121212] font-bold text-[16px] lg:text-2xl">
            <span className="mr-2 text-[#5A00DA]">{icon}</span> {greeting}, {user?.username || "Guest"}!
        </h1>
    );
}
