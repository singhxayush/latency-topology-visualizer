"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {Bot as BotIcon, Check, Cloud, Server, Zap} from "lucide-react";
import {
  Bot,
  bots,
  Exchange,
  exchanges,
  PROVIDER_COLORS,
  PROVIDERS,
} from "../dashboard/globe/globeData";
import {useAtom} from "jotai";
import {
  botAtom,
  exchangeAtom,
  providerAtom,
} from "../../atoms/globerFilterAtoms";

const DashboardSidebar = () => {
  return (
    <Sidebar
      side="right"
      collapsible="offcanvas"
      className="border-0 border-transparent bg-transparent transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    >
      <SidebarContent className="px-4 py-4 bg-white dark:bg-neutral-950 my-4 mt-15 rounded-l-2xl space-y-6">
        <h2 className="flex items-center gap-2 text-md font-bold text-white pb-2 mb-3">
          <Zap className="text-yellow-300" /> Crypto Latency Dashboard
        </h2>
        <SidebarProviderFilter />
        <SidebarExhangeServerFilter />
        <SidebarBotServerFilter />
      </SidebarContent>
    </Sidebar>
  );
};

const SidebarProviderFilter = () => {
  const [selectedProviders, setSelectedProviders] = useAtom(providerAtom);

  const handleProviderChange = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  };

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <div className="flex flex-col space-y-3">
          <h3 className="flex items-center gap-2 font-semibold text-md text-neutral-200">
            <Cloud /> Filter by Provider
          </h3>
          {PROVIDERS.map((provider) => (
            <ProviderCheckbox
              key={provider}
              provider={provider}
              selectedProviders={selectedProviders}
              onProviderChange={handleProviderChange}
            />
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const ProviderCheckbox = ({
  provider,
  selectedProviders,
  onProviderChange,
}: {
  provider: string;
  selectedProviders: string[];
  onProviderChange: (provider: string) => void;
}) => (
  <label className="flex items-center space-x-3 cursor-pointer text-sm">
    <input
      type="checkbox"
      className="hidden"
      checked={selectedProviders.includes(provider)}
      onChange={() => onProviderChange(provider)}
    />
    <span
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
        selectedProviders.includes(provider)
          ? "border-neutral-700 bg-neutral-900"
          : "border-neutral-500 bg-neutral-700"
      }`}
    >
      {selectedProviders.includes(provider) && <Check className="size-4" />}
    </span>
    <span style={{color: PROVIDER_COLORS[provider]}} className="font-bold">
      {provider}
    </span>
  </label>
);

const SidebarExhangeServerFilter = () => {
  const [selectedExchange, setSelectedExchange] = useAtom(exchangeAtom);

  const handleExcchangeServerChange = (exchange: Exchange) => {
    setSelectedExchange((prev) =>
      prev.includes(exchange)
        ? prev.filter((p) => p !== exchange)
        : [...prev, exchange]
    );
  };

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <div className="flex flex-col space-y-3">
          <h3 className="flex items-center gap-2 font-semibold text-md text-neutral-200">
            <Server /> Filter by Exchange Server
          </h3>
          {exchanges.map((exchange) => (
            <ExchangeServerCheckbox
              key={exchange.name}
              exchange={exchange}
              selectedExchange={selectedExchange}
              onProviderChange={handleExcchangeServerChange}
            />
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const ExchangeServerCheckbox = ({
  exchange,
  selectedExchange,
  onProviderChange,
}: {
  exchange: Exchange;
  selectedExchange: Exchange[];
  onProviderChange: (provider: Exchange) => void;
}) => (
  <label className="flex items-center space-x-3 cursor-pointer text-sm">
    <input
      type="checkbox"
      className="hidden"
      checked={selectedExchange.includes(exchange)}
      onChange={() => onProviderChange(exchange)}
    />
    <span
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
        selectedExchange.includes(exchange)
          ? "border-fuchsia-400 bg-fuchsia-500"
          : "border-neutral-500 bg-neutral-700"
      }`}
    >
      {selectedExchange.includes(exchange) && (
        <Check className="size-4 stroke-3" />
      )}
    </span>

    <span className="flex flex-col">
      <span className="space-x-2">
        <span className="font-bold">{exchange.name}</span>
        <span
          className="font-normal"
          style={{color: PROVIDER_COLORS[exchange.cloudProvider]}}
        >
          {"("}
          {exchange.cloudProvider}
          {")"}
        </span>
      </span>
      <span className="font-normal text-xs">{exchange.regionCode}</span>
    </span>
  </label>
);

const SidebarBotServerFilter = () => {
  const [selectedBot, setSelectedBot] = useAtom(botAtom);

  const handleBotServerChange = (bot: Bot) => {
    setSelectedBot((prev) =>
      prev.includes(bot) ? prev.filter((p) => p !== bot) : [...prev, bot]
    );
  };

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <div className="flex flex-col space-y-3">
          <h3 className="flex items-center gap-2 font-semibold text-md text-neutral-200">
            <BotIcon /> Filter by Exchange Server
          </h3>
          {bots.map((bot) => (
            <BotServerCheckbox
              key={bot.name}
              bot={bot}
              selectedBot={selectedBot}
              onBotServerChange={handleBotServerChange}
            />
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const BotServerCheckbox = ({
  bot,
  selectedBot,
  onBotServerChange,
}: {
  bot: Bot;
  selectedBot: Bot[];
  onBotServerChange: (provider: Bot) => void;
}) => (
  <label className="flex items-center space-x-3 cursor-pointer text-sm">
    <input
      type="checkbox"
      className="hidden"
      checked={selectedBot.includes(bot)}
      onChange={() => onBotServerChange(bot)}
    />
    <span
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
        selectedBot.includes(bot)
          ? "border-cyan-400 bg-cyan-500"
          : "border-neutral-500 bg-neutral-700"
      }`}
    >
      {selectedBot.includes(bot) && (
        <Check className="size-4 text-neutral-800 stroke-3" />
      )}
    </span>

    <span className="flex flex-col">
      <span className="space-x-2">
        <span className="font-bold">{bot.name}</span>
        <span
          className="font-normal"
          style={{color: PROVIDER_COLORS[bot.cloudProvider]}}
        >
          {"("}
          {bot.cloudProvider}
          {")"}
        </span>{" "}
      </span>
      <span className="font-normal text-xs">{bot.regionCode}</span>
    </span>
  </label>
);

export default DashboardSidebar;
