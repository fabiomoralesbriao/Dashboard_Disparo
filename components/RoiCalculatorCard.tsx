import React from 'react';
import RoiIcon from './icons/RoiIcon';

const RoiCalculatorCard: React.FC = () => {
    return (
      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 border border-yellow-400/50 rounded-xl p-5 shadow-lg flex flex-col justify-between h-48 backdrop-blur-sm hover:border-yellow-300 transition-colors duration-300 shadow-[0_0_25px_rgba(234,179,8,0.4)]">
        <div>
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/20`}>
                    <RoiIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm text-white tracking-wider">CALCULADORA ROI</h3>
            </div>
            <p className="text-xs text-yellow-100 mt-2 ml-1">Retorno sobre investimento em leads</p>
        </div>
        <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors">
            CALCULAR ROI
        </button>
      </div>
    );
  };
  
  export default RoiCalculatorCard;
