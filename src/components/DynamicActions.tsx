import { ActionItem } from '../types';

interface DynamicActionsProps {
  ui: ActionItem[];
}

export default function DynamicActions({ ui }: DynamicActionsProps) {
  const handleAction = (item: ActionItem) => {
    const element = document.querySelector(item.selector);
    
    if (!element) {
      console.log(`Elemento no encontrado: ${item.selector}`);
      return;
    }

    switch (item.action) {
      case 'click':
        (element as HTMLElement).click();
        console.log(`Click ejecutado en: ${item.selector}`);
        break;
        
      case 'input':
        (element as HTMLInputElement).value = 'test';
        console.log(`Input actualizado en: ${item.selector}`);
        break;
        
      default:
        console.log(`Acción no soportada: ${item.action}`);
    }
  };

  if (!ui.length) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Acciones disponibles:
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {ui.map((item, index) => (
          <button
            key={`${item.selector}-${index}`}
            onClick={() => handleAction(item)}
            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 
                     text-gray-800 text-sm rounded-md 
                     transition-colors duration-200 
                     focus:outline-none focus:ring-2 
                     focus:ring-gray-400 focus:ring-opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
} 