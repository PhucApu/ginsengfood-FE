'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';

const ADMIN_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBbq0UjAHfN-UDP5F4gi10ZlpdZHjwqa8rMk25p5Cduv5Z_c5nM5sdfOy7MzITaNeY3N7k887CJE1UC7_iersr2F2MpoCdJ8H0-fjL0krLizAixtlwfAHIdwfPLyRChGTfxI1mRN1Ii9reL73ow961dsoSJe6RXunLjgKvPr_k1_Gy8BI6a3ozekraA5qRsn_tSgTPIErXjkBkcKWG7qT2tG2ozicQLWWV0ZfE2fZSDxUBqnl0_Fxjz3NusGYqG4_zcVjQMrKCOeac';

// ─── Data model ─────────────────────────────────────────────────────────────

interface NavLeaf {
  type: 'leaf';
  id: string;
  label: string;
  href: string;
}

interface NavSubGroup {
  type: 'subgroup';
  id: string;
  label: string;
  children: NavLeaf[];
}

interface NavGroup {
  type: 'group';
  id: string;
  icon: string;
  label: string;
  children: (NavLeaf | NavSubGroup)[];
}

interface NavTopItem {
  type: 'item';
  id: string;
  icon: string;
  label: string;
  href: string;
}

type NavEntry = NavTopItem | NavGroup;

function leaf(id: string, label: string, href = '#'): NavLeaf {
  return { type: 'leaf', id, label, href };
}
function subgroup(id: string, label: string, children: NavLeaf[]): NavSubGroup {
  return { type: 'subgroup', id, label, children };
}
function group(id: string, icon: string, label: string, children: (NavLeaf | NavSubGroup)[]): NavGroup {
  return { type: 'group', id, icon, label, children };
}
function item(id: string, icon: string, label: string, href: string): NavTopItem {
  return { type: 'item', id, icon, label, href };
}

const NAV_ENTRIES: NavEntry[] = [
  item('overview', 'dashboard', 'Tổng quan', '/admin'),

  group('core', 'account_tree', 'Core & Governance', [
    subgroup('event_governance', 'Event Governance', [
      leaf('event_registry', 'Event Registry'),
      leaf('event_audit', 'Event Audit'),
      leaf('web_events', 'Web Events'),
      leaf('order_events', 'Order Events'),
      leaf('member_events', 'Member Events'),
      leaf('system_events', 'System Events'),
    ]),
    subgroup('snapshot_factory', 'Snapshot Factory', [
      leaf('snapshot_viewer', 'Snapshot Viewer'),
      leaf('order_snapshot', 'Order Snapshot'),
      leaf('member_snapshot', 'Member Snapshot'),
      leaf('guest_profile_snapshot', 'Guest Profile Snapshot'),
      leaf('guest_consent_snapshot', 'Guest Marketing Consent Snapshot'),
    ]),
    subgroup('policy_governance', 'Policy & Governance', [
      leaf('policy_versions', 'Policy Versions'),
      leaf('config_audit_logs', 'Config Audit Logs'),
    ]),
    leaf('outbox_monitor', 'Async / Outbox Monitor'),
  ]),

  group('commerce', 'storefront', 'Vận hành thương mại', [
    leaf('sku_catalog', 'SKU Catalog'),
    leaf('order_admin', 'Order Admin'),
    leaf('payment_admin', 'Payment Admin'),
    leaf('member_tier_admin', 'Member / Tier Admin'),
    leaf('golden_hour_admin', 'Golden Hour Admin'),
    leaf('promotion_admin', 'Promotion Admin'),
  ]),

  group('customers', 'people', 'Khách hàng & phân khúc', [
    leaf('customer_data', 'Customer Data'),
    leaf('guest_consent', 'Guest / Consent'),
    leaf('segmentation', 'Segmentation'),
    leaf('data_mart', 'Data Mart / Analytics'),
  ]),

  group('crm_ai', 'smart_toy', 'CRM & AI', [
    leaf('crm_admin', 'CRM Admin'),
    leaf('template_admin', 'Template Admin'),
    leaf('ai_brain_admin', 'AI Operating Brain Admin', '/admin/ai_operation_brain'),
  ]),

  group('ads', 'campaign', 'Ads & Audience', [
    leaf('ads_admin', 'Ads Admin'),
    leaf('audience_admin', 'Audience Admin'),
  ]),

  group('channels', 'hub', 'Kênh & Gateway', [
    leaf('delivery_monitor', 'Delivery Monitor'),
    leaf('ivr_admin', 'IVR Admin'),
    leaf('gsm_admin', 'GSM Admin'),
    leaf('channel_router', 'Channel Router'),
  ]),

  group('finance', 'account_balance', 'Tài chính', [
    leaf('diamond_commission', 'Diamond Commission Admin'),
    leaf('pit_tax_admin', 'PIT / Tax Admin'),
    leaf('reporting_period', 'Reporting Period'),
  ]),

  group('security', 'shield', 'Bảo mật & phân quyền', [
    leaf('policy_audit', 'Policy Admin / Audit Log'),
    leaf('rbac', 'RBAC'),
    leaf('break_glass', 'Break-glass'),
    leaf('security_review', 'Security review'),
  ]),
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Collect all hrefs nested inside a group or subgroup */
function collectHrefs(node: NavGroup | NavSubGroup): string[] {
  const hrefs: string[] = [];
  for (const child of node.children) {
    if (child.type === 'leaf') {
      if (child.href !== '#') hrefs.push(child.href);
    } else {
      hrefs.push(...collectHrefs(child));
    }
  }
  return hrefs;
}

/** IDs of groups/subgroups that contain the active pathname */
function getInitialOpenIds(pathname: string): Set<string> {
  const open = new Set<string>();
  for (const entry of NAV_ENTRIES) {
    if (entry.type !== 'group') continue;
    for (const child of entry.children) {
      if (child.type === 'subgroup') {
        const hrefs = collectHrefs(child);
        if (hrefs.some((h) => pathname.startsWith(h))) {
          open.add(entry.id);
          open.add(child.id);
        }
      } else if (child.type === 'leaf' && child.href !== '#' && pathname.startsWith(child.href)) {
        open.add(entry.id);
      }
    }
  }
  return open;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function LeafItem({ node, pathname }: { node: NavLeaf; pathname: string }) {
  const active = node.href !== '#' && pathname.startsWith(node.href);
  return (
    <Link
      href={node.href}
      className={`flex items-center pl-3 pr-3 py-1.5 rounded-lg text-xs font-body transition-colors duration-150 ${
        active
          ? 'text-primary font-semibold bg-surface-container'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
      }`}
    >
      <span className={`w-1 h-1 rounded-full mr-2.5 shrink-0 ${active ? 'bg-primary' : 'bg-outline-variant'}`} />
      {node.label}
    </Link>
  );
}

function SubGroupItem({
  node,
  pathname,
  isOpen,
  onToggle,
}: {
  node: NavSubGroup;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasActive = collectHrefs(node).some((h) => pathname.startsWith(h));

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between pl-3 pr-2 py-1.5 rounded-lg text-xs font-body font-medium transition-colors duration-150 ${
          hasActive
            ? 'text-primary'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
        }`}
      >
        <span>{node.label}</span>
        <span
          className={`material-symbols-outlined text-sm leading-none transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="mt-0.5 ml-3 pl-2 border-l border-outline-variant/30 space-y-0.5">
          {node.children.map((child) => (
            <LeafItem key={child.id} node={child} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
}

function GroupItem({
  node,
  pathname,
  isOpen,
  openSubIds,
  onToggle,
  onSubToggle,
}: {
  node: NavGroup;
  pathname: string;
  isOpen: boolean;
  openSubIds: Set<string>;
  onToggle: () => void;
  onSubToggle: (id: string) => void;
}) {
  const hasActive = collectHrefs(node).some((h) => pathname.startsWith(h));

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body font-medium transition-colors duration-150 ${
          hasActive
            ? 'text-primary bg-surface-container-low'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
        }`}
      >
        <span
          className="material-symbols-outlined text-[18px] leading-none shrink-0"
          style={hasActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {node.icon}
        </span>
        <span className="flex-1 text-left">{node.label}</span>
        <span
          className={`material-symbols-outlined text-sm leading-none transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="mt-1 ml-2 pl-2 border-l border-outline-variant/30 space-y-0.5 pb-1">
          {node.children.map((child) => {
            if (child.type === 'subgroup') {
              return (
                <SubGroupItem
                  key={child.id}
                  node={child}
                  pathname={pathname}
                  isOpen={openSubIds.has(child.id)}
                  onToggle={() => onSubToggle(child.id)}
                />
              );
            }
            return <LeafItem key={child.id} node={child} pathname={pathname} />;
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function AdminSidebar() {
  const pathname = usePathname();

  const initialOpen = useMemo(() => getInitialOpenIds(pathname), [pathname]);
  const [openIds, setOpenIds] = useState<Set<string>>(initialOpen);

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isTopActive = (href: string) => href !== '#' && pathname === href;

  return (
    <nav className="hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant/30 w-64 fixed left-0 top-0 h-screen z-40">
      {/* Brand header */}
      <div className="flex flex-col justify-center px-6 h-16 border-b border-outline-variant/30 shrink-0">
        <span className="font-serif italic font-bold text-primary text-2xl tracking-tighter leading-tight">
          Ginsengfood
        </span>
        <span className="text-xs text-on-surface-variant font-body tracking-wide opacity-60">
          Operational Control
        </span>
      </div>

      {/* Admin profile */}
      <div className="flex items-center space-x-3 px-6 py-4 border-b border-outline-variant/30 shrink-0">
        <Image
          src={ADMIN_AVATAR_URL}
          alt="Admin photo"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full border border-outline-variant/20 shrink-0"
        />
        <div>
          <p className="font-semibold text-on-surface text-sm">Admin Core</p>
          <p className="text-xs text-on-surface-variant">Operational Control</p>
        </div>
      </div>

      {/* Main nav */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {NAV_ENTRIES.map((entry) => {
          if (entry.type === 'item') {
            const active = isTopActive(entry.href);
            return (
              <Link
                key={entry.id}
                href={entry.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body font-medium transition-colors duration-150 ${
                  active
                    ? 'text-primary bg-surface-container border-r-4 border-primary -mr-3 pr-3 rounded-r-none'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px] leading-none shrink-0"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {entry.icon}
                </span>
                <span>{entry.label}</span>
              </Link>
            );
          }

          return (
            <GroupItem
              key={entry.id}
              node={entry}
              pathname={pathname}
              isOpen={openIds.has(entry.id)}
              openSubIds={openIds}
              onToggle={() => toggle(entry.id)}
              onSubToggle={toggle}
            />
          );
        })}
      </div>

      {/* Footer nav */}
      <div className="py-3 px-3 border-t border-outline-variant/30 space-y-0.5">
        <Link
          href="#"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-150"
        >
          <span className="material-symbols-outlined text-[18px] leading-none">logout</span>
          <span>Đăng xuất</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-150"
        >
          <span className="material-symbols-outlined text-[18px] leading-none">contact_support</span>
          <span>Support</span>
        </Link>
      </div>
    </nav>
  );
}
