// My-Components
import Logo from "./Logo";
import AvatarMenu from "./AvatarMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = async () => {
   return (
      <header className="fixed inset-x-0 z-40 w-full bg-background drop-shadow-md dark:shadow-white/10 dark:shadow-xs">
         <nav className="flex-between container relative h-header-height">
            <Logo width={65} height={56} />
            <div className="flex-between gap-2">
               <ThemeSwitcher />
               <LanguageSwitcher />
               <AvatarMenu />
            </div>
         </nav>
      </header>
   );
};

export default Header;
