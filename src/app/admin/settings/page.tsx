'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface SiteSetting { id: string; key: string; value: string }
interface SocialLink { id: string; platform: string; url: string; sort_order: number; is_visible: boolean; [key: string]: any }
interface NavItem { id: string; label: string; href: string; sort_order: number; is_visible: boolean; [key: string]: any }

export default function SettingsPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Site Settings
  const [showSettingForm, setShowSettingForm] = useState(false)
  const [editingSettingId, setEditingSettingId] = useState<string | null>(null)
  const [settingFormData, setSettingFormData] = useState({ key: '', value: '' })

  // Social Links
  const [showSocialForm, setShowSocialForm] = useState(false)
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null)
  const [socialFormData, setSocialFormData] = useState<Partial<SocialLink>>({
    platform: '',
    url: '',
    sort_order: 0,
    is_visible: true,
  })

  // Nav Items
  const [showNavForm, setShowNavForm] = useState(false)
  const [editingNavId, setEditingNavId] = useState<string | null>(null)
  const [navFormData, setNavFormData] = useState<Partial<NavItem>>({
    label: '',
    href: '',
    sort_order: 0,
    is_visible: true,
  })

  useEffect(() => {
    fetchAllSettings()
  }, [])

  const fetchAllSettings = async () => {
    try {
      setLoading(true)
      setError('')

      const [settingsRes, socialRes, navRes] = await Promise.all([
        fetch('/api/admin/site_settings'),
        fetch('/api/admin/social_links'),
        fetch('/api/admin/nav_items'),
      ])

      if (!settingsRes.ok) throw new Error('Failed to load site settings')
      if (!socialRes.ok) throw new Error('Failed to load social links')
      if (!navRes.ok) throw new Error('Failed to load nav items')

      setSiteSettings(await settingsRes.json())
      setSocialLinks(await socialRes.json())
      setNavItems(await navRes.json())
    } catch (err) {
      console.error('Failed to fetch settings:', err)
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  // ===== Site Settings =====
  const handleAddSetting = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(''); setSuccess('')
      if (!settingFormData.key || !settingFormData.value) { setError('Key and value are required'); return }

      if (editingSettingId) {
        const res = await fetch('/api/admin/site_settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingSettingId, key: settingFormData.key, value: settingFormData.value }) })
        if (!res.ok) throw new Error(await res.text())
        setSuccess('Setting updated successfully')
      } else {
        const res = await fetch('/api/admin/site_settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settingFormData) })
        if (!res.ok) throw new Error(await res.text())
        setSuccess('Setting created successfully')
      }

      resetSettingForm(); fetchAllSettings()
    } catch (err) { console.error('Failed to save setting:', err); setError('Failed to save setting') }
  }

  const handleDeleteSetting = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      setError(''); setSuccess('')
      const res = await fetch('/api/admin/site_settings', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      if (!res.ok) throw new Error(await res.text())
      setSuccess('Setting deleted successfully'); fetchAllSettings()
    } catch (err) { console.error('Failed to delete setting:', err); setError('Failed to delete setting') }
  }

  const handleEditSetting = (setting: SiteSetting) => {
    setSettingFormData({ key: setting.key, value: setting.value })
    setEditingSettingId(setting.id); setShowSettingForm(true)
  }

  const resetSettingForm = () => { setSettingFormData({ key: '', value: '' }); setEditingSettingId(null); setShowSettingForm(false) }

  // ===== Social Links =====
  const handleAddSocialLink = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(''); setSuccess('')
      if (!socialFormData.platform || !socialFormData.url) { setError('Platform and URL are required'); return }

      if (editingSocialId) {
        const res = await fetch('/api/admin/social_links', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingSocialId, ...socialFormData }) })
        if (!res.ok) throw new Error(await res.text())
        setSuccess('Social link updated successfully')
      } else {
        const res = await fetch('/api/admin/social_links', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(socialFormData) })
        if (!res.ok) throw new Error(await res.text())
        setSuccess('Social link created successfully')
      }

      resetSocialForm(); fetchAllSettings()
    } catch (err) { console.error('Failed to save social link:', err); setError('Failed to save social link') }
  }

  const handleDeleteSocialLink = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      setError(''); setSuccess('')
      const res = await fetch('/api/admin/social_links', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      if (!res.ok) throw new Error(await res.text())
      setSuccess('Social link deleted successfully'); fetchAllSettings()
    } catch (err) { console.error('Failed to delete social link:', err); setError('Failed to delete social link') }
  }

  const handleEditSocialLink = (link: SocialLink) => { setSocialFormData(link); setEditingSocialId(link.id); setShowSocialForm(true) }

  const resetSocialForm = () => { setSocialFormData({ platform: '', url: '', sort_order: 0, is_visible: true }); setEditingSocialId(null); setShowSocialForm(false) }

  // ===== Nav Items =====
  const handleAddNavItem = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(''); setSuccess('')
      if (!navFormData.label || !navFormData.href) { setError('Label and href are required'); return }

      if (editingNavId) {
        const res = await fetch('/api/admin/nav_items', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingNavId, ...navFormData }) })
        if (!res.ok) throw new Error(await res.text())
        setSuccess('Nav item updated successfully')
      } else {
        const res = await fetch('/api/admin/nav_items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(navFormData) })
        if (!res.ok) throw new Error(await res.text())
        setSuccess('Nav item created successfully')
      }

      resetNavForm(); fetchAllSettings()
    } catch (err) { console.error('Failed to save nav item:', err); setError('Failed to save nav item') }
  }

  const handleDeleteNavItem = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      setError(''); setSuccess('')
      const res = await fetch('/api/admin/nav_items', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      if (!res.ok) throw new Error(await res.text())
      setSuccess('Nav item deleted successfully'); fetchAllSettings()
    } catch (err) { console.error('Failed to delete nav item:', err); setError('Failed to delete nav item') }
  }

  const handleEditNavItem = (item: NavItem) => { setNavFormData(item); setEditingNavId(item.id); setShowNavForm(true) }

  const resetNavForm = () => { setNavFormData({ label: '', href: '', sort_order: 0, is_visible: true }); setEditingNavId(null); setShowNavForm(false) }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#C8622A] border-t-white"></div>
          <p className="text-white">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-[#888888]">Manage site configuration</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 px-6 py-4 text-red-400">{error}</div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-600/20 px-6 py-4 text-green-400">{success}</div>
      )}

      {/* Site Settings Section */}
      <div className="mb-8 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Site Settings</h2>
          <button onClick={() => setShowSettingForm(true)} className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97535]"><Plus size={16} />Add Setting</button>
        </div>

        {showSettingForm && (
          <form onSubmit={handleAddSetting} className="mb-6 rounded-lg border border-[#404040] bg-[#1a1a1a] p-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input type="text" placeholder="Setting key (e.g., site_name)" value={settingFormData.key} onChange={(e) => setSettingFormData((prev) => ({ ...prev, key: e.target.value }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" required />
                <input type="text" placeholder="Setting value" value={settingFormData.value} onChange={(e) => setSettingFormData((prev) => ({ ...prev, value: e.target.value }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" required />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="rounded-lg bg-[#C8622A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97535]">{editingSettingId ? 'Update' : 'Add'} Setting</button>
                <button type="button" onClick={resetSettingForm} className="rounded-lg border border-[#404040] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d2d2d]">Cancel</button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {siteSettings.length === 0 ? (
            <div className="rounded-lg border border-[#404040] bg-[#1a1a1a] p-4 text-center"><p className="text-[#888888]">No settings yet</p></div>
          ) : (
            siteSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between rounded-lg border border-[#404040] bg-[#1a1a1a] p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#888888]">{setting.key}</p>
                  <p className="mt-1 text-white">{setting.value}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditSetting(setting)} className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeleteSetting(setting.id)} className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mb-8 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Social Links</h2>
          <button onClick={() => setShowSocialForm(true)} className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97535]"><Plus size={16} />Add Social Link</button>
        </div>

        {showSocialForm && (
          <form onSubmit={handleAddSocialLink} className="mb-6 rounded-lg border border-[#404040] bg-[#1a1a1a] p-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input type="text" placeholder="Platform (e.g., Twitter)" value={socialFormData.platform || ''} onChange={(e) => setSocialFormData((prev) => ({ ...prev, platform: e.target.value }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" required />
                <input type="url" placeholder="URL" value={socialFormData.url || ''} onChange={(e) => setSocialFormData((prev) => ({ ...prev, url: e.target.value }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input type="number" placeholder="Sort Order" value={socialFormData.sort_order || 0} onChange={(e) => setSocialFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" />
                <label className="flex items-center gap-2 rounded-lg p-2"><input type="checkbox" checked={socialFormData.is_visible || false} onChange={(e) => setSocialFormData((prev) => ({ ...prev, is_visible: e.target.checked }))} className="h-4 w-4 rounded border-[#404040] bg-[#1a1a1a] accent-[#C8622A]" /><span className="text-sm font-medium text-white">Visible</span></label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="rounded-lg bg-[#C8622A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97535]">{editingSocialId ? 'Update' : 'Add'} Link</button>
                <button type="button" onClick={resetSocialForm} className="rounded-lg border border-[#404040] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d2d2d]">Cancel</button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {socialLinks.length === 0 ? (
            <div className="rounded-lg border border-[#404040] bg-[#1a1a1a] p-4 text-center"><p className="text-[#888888]">No social links yet</p></div>
          ) : (
            socialLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between rounded-lg border border-[#404040] bg-[#1a1a1a] p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#888888]">{link.platform}</p>
                  <p className="mt-1 text-white break-all">{link.url}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="text-[#888888]">Order: {link.sort_order}</span>
                    <span className={`rounded-full px-2 py-1 ${link.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>{link.is_visible ? 'Visible' : 'Hidden'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditSocialLink(link)} className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeleteSocialLink(link.id)} className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigation Items Section */}
      <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Navigation Items</h2>
          <button onClick={() => setShowNavForm(true)} className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97535]"><Plus size={16} />Add Nav Item</button>
        </div>

        {showNavForm && (
          <form onSubmit={handleAddNavItem} className="mb-6 rounded-lg border border-[#404040] bg-[#1a1a1a] p-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input type="text" placeholder="Label (e.g., Home)" value={navFormData.label || ''} onChange={(e) => setNavFormData((prev) => ({ ...prev, label: e.target.value }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" required />
                <input type="text" placeholder="Href (e.g., /)" value={navFormData.href || ''} onChange={(e) => setNavFormData((prev) => ({ ...prev, href: e.target.value }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input type="number" placeholder="Sort Order" value={navFormData.sort_order || 0} onChange={(e) => setNavFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) }))} className="rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none" />
                <label className="flex items-center gap-2 rounded-lg p-2"><input type="checkbox" checked={navFormData.is_visible || false} onChange={(e) => setNavFormData((prev) => ({ ...prev, is_visible: e.target.checked }))} className="h-4 w-4 rounded border-[#404040] bg-[#1a1a1a] accent-[#C8622A]" /><span className="text-sm font-medium text-white">Visible</span></label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="rounded-lg bg-[#C8622A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97535]">{editingNavId ? 'Update' : 'Add'} Item</button>
                <button type="button" onClick={resetNavForm} className="rounded-lg border border-[#404040] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d2d2d]">Cancel</button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {navItems.length === 0 ? (
            <div className="rounded-lg border border-[#404040] bg-[#1a1a1a] p-4 text-center"><p className="text-[#888888]">No navigation items yet</p></div>
          ) : (
            navItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-[#404040] bg-[#1a1a1a] p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#888888]">{item.label}</p>
                  <p className="mt-1 text-white">{item.href}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="text-[#888888]">Order: {item.sort_order}</span>
                    <span className={`rounded-full px-2 py-1 ${item.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>{item.is_visible ? 'Visible' : 'Hidden'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditNavItem(item)} className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeleteNavItem(item.id)} className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
