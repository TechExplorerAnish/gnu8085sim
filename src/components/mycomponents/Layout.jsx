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
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssemblerMessage from "./AssemblerMessage";
import FlagPanel  from "./FlagPanel"

export default function Layout() {
  const [theme, setTheme] = useState("dark");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex flex-col h-screen bg-background transition-colors duration-200">
      <header className="border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between">
          <Toolbar />
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden ">
        <div className="relative flex">
          <div
            className={`transition-all duration-5000 ${
              !leftSidebarOpen ? "w-0 overflow-hidden" : "w-64 md:w-72 lg:w-80"
            }`}
          >
            <aside className="h-full w-64 md:w-72 lg:w-80 border-r border-border/40">
              <ScrollArea className="h-full p-4">
                <div className="flex flex-col gap-4">
                  <div className="">
                    <RegistersPanel />
                    <FlagPanel />
                  </div>
                  <ConversionPanel />
                  <IOPanel />
                </div>
              </ScrollArea>
            </aside>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 my-2"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          >
            {leftSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        <main className="flex-1 flex flex-col min-w-0 ">
          <CodeEditor />
        </main>
        <div className="relative    lg:flex">
          {/* relative flex hidden lg:flex*/}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 my-2"
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          >
            {rightSidebarOpen ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
          <div
            className={`transition-all mt-2 duration-300 ${
              !rightSidebarOpen ? "w-0 overflow-hidden" : "w-80"
            }`}
          >
            <aside className="h-full w-80 border-l border-border/40 bg-white dark:bg-slate-950">
              <Tabs defaultValue="data" className="h-full">
                <TabsList className="w-full justify-start rounded-none border-b px-2  bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
                  <TabsTrigger value="data">Data</TabsTrigger>
                  <TabsTrigger value="stack">Stack</TabsTrigger>
                  <TabsTrigger value="keypad">KeyPad</TabsTrigger>
                  <TabsTrigger value="memory">Memory</TabsTrigger>
                  <TabsTrigger value="io">I/O</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[calc(100%-40px)]">
                  <TabsContent value="data" className="m-0 p-4">
                    <DataPanel />
                  </TabsContent>
                  <TabsContent value="keypad" className="m-0 p-4">
                    <KeypadPanel />
                  </TabsContent>
                  <TabsContent value="memory" className="m-0 ">
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
    </div>
  );
}
