import { serverGet } from "@/lib/server-api";
import type { SiteSettings } from "@/lib/types";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await serverGet<SiteSettings>("/api/admin/settings");

  if (!settings) {
    return <p className="text-sm text-red-600">Could not load site settings.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Site Settings</h1>
      <p className="mt-1 text-sm text-zinc-500">Site-wide text used across the storefront.</p>
      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
