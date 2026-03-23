'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SiteSetting, SocialLink, NavItem } from '@/types'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

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

      const [settingsResult, socialResult, navResult] = await Promise.all([
        supabase.from('site_settings').select('*').order('key', { ascending: true }),
        supabase.from('social_links').select('*').order('sort_order', { ascending: true }),
        supabase.from('nav_items').select('*').order('sort_order', { ascending: true }),
      ])

      if (settingsResult.error) throw settingsResult.error
      if (socialResult.error) throw socialResult.error
      if (navResult.error) throw navResult.error

      setSiteSettings(settingsResult.data || [])
      setSocialLinks(socialResult.data || [])
      setNavItems(navResult.data || [])
    } catch (err) {
      console.error('Failed to fetch settings:', err)
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  // ===== Site Settings =====
  const handleSaveSettingInline = async (setting: SiteSetting) => {
    try {
      setError('')
      setSuccess('')

      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ value: setting.value })
        .eq('id', setting.id)

      if (updateError) throw updateError
      setSuccess('Setting updated successfully')
      fetchAllSettings()
    } catch (err) {
      console.error('Failed to save setting:', err)
      setError('Failed to save setting')
    }
  }

  const handleAddSetting = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      if (!settingFormData.key || !settingFormData.value) {
        setError('Key and value are required')
        return
      }

      if (editingSettingId) {
        const { error: updateError } = await supabase
          .from('site_settings')
          .update({ key: settingFormData.key, value: settingFormData.value })
          .eq('id', editingSettingId)

        if (updateError) throw updateError
        setSuccess('Setting updated successfully')
      } else {
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert([settingFormData])

        if (insertError) throw insertError
        setSuccess('Setting created successfully')
      }

      resetSettingForm()
      fetchAllSettings()
    } catch (err) {
      console.error('Failed to save setting:', err)
      setError('Failed to save setting')
    }
  }

  const handleDeleteSetting = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      setError('')
      setSuccess('')

      const { error: deleteError } = await supabase
        .from('site_settings')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Setting deleted successfully')
      fetchAllSettings()
    } catch (err) {
      console.error('Failed to delete setting:', err)
      setError('Failed to delete setting')
    }
  }

  const handleEditSetting = (setting: SiteSetting) => {
    setSettingFormData({ key: setting.key, value: setting.value })
    setEditingSettingId(setting.id)
    setShowSettingForm(true)
  }

  const resetSettingForm = () => {
    setSettingFormData({ key: '', value: '' })
    setEditingSettingId(null)
    setShowSettingForm(false)
  }

  // ===== Social Links =====
  const handleAddSocialLink = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      if (!socialFormData.platform || !socialFormData.url) {
        setError('Platform and URL are required')
        return
      }

      if (editingSocialId) {
        const { error: updateError } = await supabase
          .from('social_links')
          .update(socialFormData)
          .eq('id', editingSocialId)

        if (updateError) throw updateError
        setSuccess('Social link updated successfully')
      } else {
        const { error: insertError } = await supabase
          .from('social_links')
          .insert([socialFormData])

        if (insertError) throw insertError
        setSuccess('Social link created successfully')
      }

      resetSocialForm()
      fetchAllSettings()
    } catch (err) {
      console.error('Failed to save social link:', err)
      setError('Failed to save social link')
    }
  }

  const handleDeleteSocialLink = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      setError('')
      setSuccess('')

      const { error: deleteError } = await supabase
        .from('social_links')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Social link deleted successfully')
      fetchAllSettings()
    } catch (err) {
      console.error('Failed to delete social link:', err)
      setError('Failed to delete social link')
    }
  }

  const handleEditSocialLink = (link: SocialLink) => {
    setSocialFormData(link)
    setEditingSocialId(link.id)
    setShowSocialForm(true)
  }

  const resetSocialForm = () => {
    setSocialFormData({
      platform: '',
      url: '',
      sort_order: 0,
      is_visible: true,
    })
    setEditingSocialId(null)
    setShowSocialForm(false)
  }

  // ===== Nav Items =====
  const handleAddNavItem = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      if (!navFormData.label || !navFormData.href) {
        setError('Label and href are required')
        return
      }

      if (editingNavId) {
        const { error: updateError } = await supabase
          .from('nav_items')
          .update(navFormData)
          .eq('id', editingNavId)

        if (updateError) throw updateError
        setSuccess('Nav item updated successfully')
      } else {
        const { error: insertError } = await supabase
          .from('nav_items')
          .insert([navFormData])

        if (insertError) throw insertError
        setSuccess('Nav item created successfully')
      }

      resetNavForm()
      fetchAllSettings()
    } catch (err) {
      console.error('Failed to save nav item:', err)
      setError('Failed to save nav item')
    }
  }

  const handleDeleteNavItem = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      setError('')
      setSuccess('')

      const { error: deleteError } = await supabase
        .from('nav_items')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Nav item deleted successfully')
      fetchAllSettings()
    } catch (err) {
      console.error('Failed to delete nav item:', err)
      setError('Failed to delete nav item')
    }
  }

  const handleEditNavItem = (item: NavItem) => {
    setNavFormData(item)
    setEditingNavId(item.id)
    setShowNavForm(true)
  }

  const resetNavForm = () => {
    setNavFormData({
      label: '',
      href: '',
      sort_order: 0,
      is_visible: true,
    })
    setEditingNavId(null)
    setShowNavForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-white-warm"></div>
          <p className="text-white-warm">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white-warm">Settings</h1>
        <p className="mt-2 text-ink-soft">Manage site configuration</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/20 px-6 py-4 text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-500/20 px-6 py-4 text-green-200">
          {success}
        </div>
      )}

      {/* Site Settings Section */}
      <div className="mb-8 rounded-lg border border-ink-soft bg-ink-muted p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white-warm">Site Settings</h2>
          <button
            onClick={() => setShowSettingForm(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-light"
          >
            <Plus size={16} />
            Add Setting
          </button>
        </div>

        {showSettingForm && (
          <form onSubmit={handleAddSetting} className="mb-6 rounded-lg border border-ink-soft bg-ink-soft/30 p-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Setting key (e.g., site_name)"
                  value={settingFormData.key}
                  onChange={(e) =>
                    setSettingFormData((prev) => ({ ...prev, key: e.target.value }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  required
                />
                <input
                  type="text"
                  placeholder="Setting value"
                  value={settingFormData.value}
                  onChange={(e) =>
                    setSettingFormData((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-light"
                >
                  {editingSettingId ? 'Update' : 'Add'} Setting
                </button>
                <button
                  type="button"
                  onClick={resetSettingForm}
                  className="rounded-lg border border-ink-soft px-4 py-2 text-sm font-medium text-white-warm transition-colors hover:bg-ink-soft/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {siteSettings.length === 0 ? (
            <div className="rounded-lg border border-ink-soft bg-ink-soft/20 p-4 text-center">
              <p className="text-ink-soft">No settings yet</p>
            </div>
          ) : (
            siteSettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between rounded-lg border border-ink-soft bg-ink-soft/30 p-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-soft">{setting.key}</p>
                  <p className="mt-1 text-white-warm">{setting.value}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSetting(setting)}
                    className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-ink-soft/30 hover:text-white-warm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSetting(setting.id)}
                    className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-500/20 hover:text-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mb-8 rounded-lg border border-ink-soft bg-ink-muted p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white-warm">Social Links</h2>
          <button
            onClick={() => setShowSocialForm(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-light"
          >
            <Plus size={16} />
            Add Social Link
          </button>
        </div>

        {showSocialForm && (
          <form onSubmit={handleAddSocialLink} className="mb-6 rounded-lg border border-ink-soft bg-ink-soft/30 p-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Platform (e.g., Twitter)"
                  value={socialFormData.platform || ''}
                  onChange={(e) =>
                    setSocialFormData((prev) => ({ ...prev, platform: e.target.value }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  required
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={socialFormData.url || ''}
                  onChange={(e) =>
                    setSocialFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  placeholder="Sort Order"
                  value={socialFormData.sort_order || 0}
                  onChange={(e) =>
                    setSocialFormData((prev) => ({
                      ...prev,
                      sort_order: parseInt(e.target.value),
                    }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
                <label className="flex items-center gap-2 rounded-lg p-2">
                  <input
                    type="checkbox"
                    checked={socialFormData.is_visible || false}
                    onChange={(e) =>
                      setSocialFormData((prev) => ({
                        ...prev,
                        is_visible: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-ink-soft bg-ink-soft/30 text-accent"
                  />
                  <span className="text-sm font-medium text-white-warm">Visible</span>
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-light"
                >
                  {editingSocialId ? 'Update' : 'Add'} Link
                </button>
                <button
                  type="button"
                  onClick={resetSocialForm}
                  className="rounded-lg border border-ink-soft px-4 py-2 text-sm font-medium text-white-warm transition-colors hover:bg-ink-soft/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {socialLinks.length === 0 ? (
            <div className="rounded-lg border border-ink-soft bg-ink-soft/20 p-4 text-center">
              <p className="text-ink-soft">No social links yet</p>
            </div>
          ) : (
            socialLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between rounded-lg border border-ink-soft bg-ink-soft/30 p-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-soft">{link.platform}</p>
                  <p className="mt-1 text-white-warm break-all">{link.url}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="text-ink-soft">Order: {link.sort_order}</span>
                    <span
                      className={`rounded-full px-2 py-1 ${
                        link.is_visible
                          ? 'bg-green-500/20 text-green-200'
                          : 'bg-red-500/20 text-red-200'
                      }`}
                    >
                      {link.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSocialLink(link)}
                    className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-ink-soft/30 hover:text-white-warm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSocialLink(link.id)}
                    className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-500/20 hover:text-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Navigation Items Section */}
      <div className="rounded-lg border border-ink-soft bg-ink-muted p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white-warm">Navigation Items</h2>
          <button
            onClick={() => setShowNavForm(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-light"
          >
            <Plus size={16} />
            Add Nav Item
          </button>
        </div>

        {showNavForm && (
          <form onSubmit={handleAddNavItem} className="mb-6 rounded-lg border border-ink-soft bg-ink-soft/30 p-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Label (e.g., Home)"
                  value={navFormData.label || ''}
                  onChange={(e) =>
                    setNavFormData((prev) => ({ ...prev, label: e.target.value }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  required
                />
                <input
                  type="text"
                  placeholder="Href (e.g., /)"
                  value={navFormData.href || ''}
                  onChange={(e) =>
                    setNavFormData((prev) => ({ ...prev, href: e.target.value }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  placeholder="Sort Order"
                  value={navFormData.sort_order || 0}
                  onChange={(e) =>
                    setNavFormData((prev) => ({
                      ...prev,
                      sort_order: parseInt(e.target.value),
                    }))
                  }
                  className="rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
                <label className="flex items-center gap-2 rounded-lg p-2">
                  <input
                    type="checkbox"
                    checked={navFormData.is_visible || false}
                    onChange={(e) =>
                      setNavFormData((prev) => ({
                        ...prev,
                        is_visible: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-ink-soft bg-ink-soft/30 text-accent"
                  />
                  <span className="text-sm font-medium text-white-warm">Visible</span>
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-light"
                >
                  {editingNavId ? 'Update' : 'Add'} Item
                </button>
                <button
                  type="button"
                  onClick={resetNavForm}
                  className="rounded-lg border border-ink-soft px-4 py-2 text-sm font-medium text-white-warm transition-colors hover:bg-ink-soft/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {navItems.length === 0 ? (
            <div className="rounded-lg border border-ink-soft bg-ink-soft/20 p-4 text-center">
              <p className="text-ink-soft">No navigation items yet</p>
            </div>
          ) : (
            navItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-ink-soft bg-ink-soft/30 p-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-soft">{item.label}</p>
                  <p className="mt-1 text-white-warm">{item.href}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="text-ink-soft">Order: {item.sort_order}</span>
                    <span
                      className={`rounded-full px-2 py-1 ${
                        item.is_visible
                          ? 'bg-green-500/20 text-green-200'
                          : 'bg-red-500/20 text-red-200'
                      }`}
                    >
                      {item.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditNavItem(item)}
                    className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-ink-soft/30 hover:text-white-warm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteNavItem(item.id)}
                    className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-500/20 hover:text-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
