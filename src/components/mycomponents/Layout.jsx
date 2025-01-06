/** @format */

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RegistersPanel } from "./RegisterPannel";
import { CodeEditor } from "./CodeEditor";
import { DataPanel } from "./DataPannel";
import { KeypadPanel } from "./KeypadPannel";
import { ConversionPanel } from "./ConversionPannen";
import { IOPanel } from "./IoPannel";
import { Toolbar } from "./Toolbar";
import { MemoryPanel } from "./MemoryPannel";
import { Moon, Sun, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssemblerMessage from "./AssemblerMessage";
import FlagPanel from "./FlagPanel";

export default function Layout() {
  const [theme, setTheme] = useState("dark");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              >
                <Menu className="h-4 w-4 z-50" />
              </Button>
            )}
            <Toolbar />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`
            fixed md:relative
            ${isMobile?"z-40":""}
            ${
              leftSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-1"
            } 
            ${leftSidebarOpen ? "w-64 md:w-72 lg:w-80" : "w-0 md:w-0"}
            transition-all duration-300 
            bg-background
            h-[calc(100vh-4rem)]
            border-r border-border/40
          `}
        >
          <ScrollArea className="h-full px-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <RegistersPanel />
                <FlagPanel />
              </div>
              <ConversionPanel />
              <IOPanel />
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex min-w-0 relative">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 my-2 flex-shrink-0 z-10"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            >
              {leftSidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}

          <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-4rem)]">
            <div className="flex-1 overflow-hidden">
              <CodeEditor />
            </div>
          </main>

          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 my-2 flex-shrink-0"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            >
              {rightSidebarOpen ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* Right Sidebar */}
          <aside
            className={`
              fixed right-0 md:relative z-40
              ${
                rightSidebarOpen
                  ? "translate-x-0"
                  : "translate-x-full md:translate-x-0"
              }
              ${rightSidebarOpen ? "w-80" : "w-0 md:w-0"}
              transition-all duration-300
              bg-background
              h-[calc(100vh-4rem)]
              border-l border-border/40
            `}
          >
            <Tabs defaultValue="data" className="h-full">
              <TabsList className="w-full justify-start rounded-none border-b px-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
                <TabsTrigger value="data" className="text-sm">
                  Data
                </TabsTrigger>
                <TabsTrigger value="stack" className="text-sm">
                  Stack
                </TabsTrigger>
                <TabsTrigger value="keypad" className="text-sm">
                  KeyPad
                </TabsTrigger>
                <TabsTrigger value="memory" className="text-sm">
                  Memory
                </TabsTrigger>
                <TabsTrigger value="io" className="text-sm">
                  I/O
                </TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100%-40px)]">
                <TabsContent value="data" className="m-0 p-4">
                  <DataPanel />
                </TabsContent>
                <TabsContent value="keypad" className="m-0 p-4">
                  <KeypadPanel />
                </TabsContent>
                <TabsContent value="memory" className="m-0">
                  <MemoryPanel />
                </TabsContent>
                <TabsContent value="io" className="m-0 p-4">
                  <IOPanel />
                </TabsContent>
                <AssemblerMessage />
              </ScrollArea>
            </Tabs>
          </aside>
        </div>
      </div>
    </div>
  );
}
