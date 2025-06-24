import React from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

export default function Burger() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            <div
                className="w-[30px] h-[20px] flex flex-col justify-between absolute top-4 right-4 lg:hidden cursor-pointer z-[1001]"
                onClick={() => setIsOpen(true)}
            >
                <div className="w-full bg-[#121212] h-[3px] rounded-2xl"></div>
                <div className="w-full bg-[#121212] h-[3px] rounded-2xl"></div>
                <div className="w-full bg-[#121212] h-[3px] rounded-2xl"></div>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Burger Menu"
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '400px',
                        minHeight: '40%',
                        maxHeight: '90%',
                        height: 'fit-content',
                        overflow: 'auto',
                        borderRadius: '16px',
                        outline: 'none',
                        padding: '30px 20px 20px',
                        backgroundColor: '#fff',
                        color: '#121212',
                    },
                }}
            >
                <button onClick={() => setIsOpen(false)} className="text-[#5A00DA] absolute top-4 right-4">
                    <X size={24} />
                </button>
                <nav className="flex flex-col items-center gap-4 text-lg font-semibold">
                    <a href="/" className="text-[#121212] hover:text-[#5A00DA] transition-colors">Home</a>
                    <a href="/achievements-weekly" className="text-[#121212] hover:text-[#5A00DA] transition-colors">Weekly</a>
                    <a href="/achievements-monthly" className="text-[#121212] hover:text-[#5A00DA] transition-colors">Monthly</a>
                    <a href="/achievements-yearly" className="text-[#121212] hover:text-[#5A00DA] transition-colors">Yearly</a>
                    <a href="/profile" className="text-[#121212] hover:text-[#5A00DA] transition-colors">Profile</a>
                </nav>
            </Modal>
        </div>
    );
}
