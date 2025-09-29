import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}
      <button
        tabIndex={0}
        className="relative p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group"
      >
        <PaletteIcon className="h-5 w-5" />
        <div className="absolute inset-0 rounded-xl bg-primary-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-3 p-2 shadow-large bg-white backdrop-blur-lg rounded-2xl
        w-64 border border-neutral-200 max-h-80 overflow-y-auto animate-scale-in"
      >
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">Chọn giao diện</h3>
          </div>
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`
              w-full px-3 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 group
              ${theme === themeOption.name
                  ? "bg-primary-50 text-primary-600 border border-primary-200"
                  : "hover:bg-neutral-50 text-neutral-700 border border-transparent"
                }
            `}
              onClick={() => setTheme(themeOption.name)}
            >
              <div className={`p-1.5 rounded-lg ${theme === themeOption.name ? 'bg-primary-100' : 'bg-neutral-100 group-hover:bg-neutral-200'}`}>
                <PaletteIcon className="size-3" />
              </div>
              <span className="text-sm font-medium flex-1 text-left">{themeOption.label}</span>
              {/* THEME PREVIEW COLORS */}
              <div className="flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2.5 rounded-full border border-neutral-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ThemeSelector;
