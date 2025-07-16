"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, MapPin, Building, RefreshCw, Shield, Clock } from "lucide-react"

interface IPData {
  ip: string
  city: string
  region: string
  country: string
  country_name: string
  continent_code: string
  postal: string
  latitude: number
  longitude: number
  timezone: string
  utc_offset: string
  country_calling_code: string
  currency: string
  languages: string
  org: string
  asn: string
  version: string
}

export default function IPLocationFinder() {
  const [ipData, setIpData] = useState<IPData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIPData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://ipapi.co/json/")
      if (!response.ok) {
        throw new Error("Failed to fetch IP data")
      }
      const data = await response.json()
      setIpData(data)
    } catch (err) {
      setError("Unable to fetch IP information. Please try again.")
      console.error("Error fetching IP data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIPData()
  }, [])

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IP Location Finder</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Powered by Boad Technologies</p>
              </div>
            </div>
            <Button onClick={fetchIPData} disabled={loading} variant="outline" size="sm" className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Discover Your Digital Footprint</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Instantly detect your IP address, ISP information, and geographical location with our advanced geolocation
              technology.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400">Detecting your location...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="max-w-2xl mx-auto border-red-200 dark:border-red-800">
              <CardContent className="text-center py-12">
                <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <Button onClick={fetchIPData} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* IP Data Display */}
          {ipData && !loading && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Network Information
                  </CardTitle>
                  <CardDescription>Your current IP address and network details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">IP Address</span>
                      <Badge variant="secondary" className="font-mono">
                        {ipData.ip}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">IP Version</span>
                      <Badge variant="outline">IPv{ipData.version}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">ISP/Organization</span>
                      <span className="text-sm text-right max-w-48 truncate">{ipData.org}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">ASN</span>
                      <span className="text-sm font-mono">{ipData.asn}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Location Details
                  </CardTitle>
                  <CardDescription>Your approximate geographical location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Country</span>
                      <span className="text-sm">
                        {ipData.country_name} ({ipData.country})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Region</span>
                      <span className="text-sm">{ipData.region}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">City</span>
                      <span className="text-sm">{ipData.city}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Postal Code</span>
                      <span className="text-sm">{ipData.postal || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Coordinates</span>
                      <span className="text-sm font-mono">{formatCoordinates(ipData.latitude, ipData.longitude)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    Additional Information
                  </CardTitle>
                  <CardDescription>Regional and cultural information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Timezone
                        </span>
                        <span className="text-sm">
                          {ipData.timezone} ({ipData.utc_offset})
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Currency</span>
                        <span className="text-sm">{ipData.currency}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Calling Code</span>
                        <span className="text-sm">{ipData.country_calling_code}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Languages</span>
                        <span className="text-sm">{ipData.languages}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Privacy Notice */}
          <Card className="max-w-2xl mx-auto bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">Privacy & Security</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    This tool only detects publicly available information about your IP address. No personal data is
                    stored or tracked. All requests are processed securely.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 Boad Technologies. All rights reserved.</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">IP geolocation data provided by ipapi.co</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
