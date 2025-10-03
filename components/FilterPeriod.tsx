import React from 'react';
import CalendarIcon from './icons/CalendarIcon';

const periods = ['TODOS', 'HOJE', 'ÚLTIMA SEMANA', 'ÚLTIMO MÊS', 'PERSONALIZADO'];

interface DateRange {
    start: string;
    end: string;
}

interface FilterPeriodProps {
    activePeriod: string;
    onPeriodChange: (period: string) => void;
    dateRange: DateRange;
    onDateRangeChange: (newRange: DateRange) => void;
}

const FilterPeriod: React.FC<FilterPeriodProps> = ({ activePeriod, onPeriodChange, dateRange, onDateRangeChange }) => {
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDateRangeChange({
            ...dateRange,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-[#2a2d5a]/30 border border-[#4a4e91]/50 rounded-xl p-4 md:p-6 mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <h2 className="font-semibold text-white tracking-wider">FILTRAR POR PERÍODO</h2>
            </div>
            <div className='flex flex-col'>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-2 bg-[#1a1c3a]/50 p-1.5 rounded-lg">
                        {periods.map(period => (
                            <button 
                                key={period}
                                onClick={() => onPeriodChange(period)}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#101124] focus:ring-blue-500 ${
                                    activePeriod === period 
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]' 
                                    : 'text-gray-300 hover:bg-white/10'
                                }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <input id="compare" type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-600 focus:ring-offset-gray-800" />
                        <label htmlFor="compare" className="text-gray-400">Comparar com período anterior</label>
                    </div>
                </div>

                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activePeriod === 'PERSONALIZADO' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-[#4a4e91]/50">
                        <div className="flex items-center gap-2">
                            <label htmlFor="start" className="text-sm font-medium text-gray-300">Início:</label>
                            <input
                                type="date"
                                id="start"
                                name="start"
                                value={dateRange.start}
                                onChange={handleDateChange}
                                className="bg-[#1a1c3a]/50 border border-[#4a4e91]/50 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="end" className="text-sm font-medium text-gray-300">Fim:</label>
                            <input
                                type="date"
                                id="end"
                                name="end"
                                value={dateRange.end}
                                onChange={handleDateChange}
                                className="bg-[#1a1c3a]/50 border border-[#4a4e91]/50 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPeriod;