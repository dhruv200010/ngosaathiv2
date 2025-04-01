
import React, { useMemo } from "react";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO } from "@/context/NGOContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, XAxis, YAxis, Bar, Line, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2ecc71", "#3498db", "#9b59b6", "#e74c3c", "#f39c12", "#1abc9c"];

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const { activities } = useNGO();

  // Activities by month chart data
  const activitiesByMonth = useMemo(() => {
    const monthMap: Record<string, number> = {};
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short', year: '2-digit' });
    }).reverse();
    
    months.forEach(month => {
      monthMap[month] = 0;
    });
    
    activities.forEach(activity => {
      try {
        const date = new Date(activity.date);
        const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
        if (monthMap[monthYear] !== undefined) {
          monthMap[monthYear] += 1;
        }
      } catch (error) {
        // Skip invalid dates
      }
    });
    
    return Object.entries(monthMap).map(([name, value]) => ({ name, value }));
  }, [activities]);

  // Beneficiaries by gender chart data
  const beneficiariesByGender = useMemo(() => {
    const genderCount: Record<string, number> = {
      female: 0,
      male: 0,
      other: 0
    };
    
    activities.forEach(activity => {
      activity.beneficiaries.forEach(beneficiary => {
        if (genderCount[beneficiary.gender] !== undefined) {
          genderCount[beneficiary.gender] += 1;
        }
      });
    });
    
    return Object.entries(genderCount).map(([name, value]) => ({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      value 
    }));
  }, [activities]);

  // Beneficiaries by age chart data
  const beneficiariesByAge = useMemo(() => {
    const ageGroups: Record<string, number> = {
      "0-18": 0,
      "19-30": 0,
      "31-45": 0,
      "46-60": 0,
      "60+": 0
    };
    
    activities.forEach(activity => {
      activity.beneficiaries.forEach(beneficiary => {
        const age = parseInt(beneficiary.age, 10);
        if (!isNaN(age)) {
          if (age <= 18) ageGroups["0-18"] += 1;
          else if (age <= 30) ageGroups["19-30"] += 1;
          else if (age <= 45) ageGroups["31-45"] += 1;
          else if (age <= 60) ageGroups["46-60"] += 1;
          else ageGroups["60+"] += 1;
        }
      });
    });
    
    return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
  }, [activities]);

  // Documents by type chart data
  const documentsByType = useMemo(() => {
    const typeCount: Record<string, number> = {
      bill: 0,
      receipt: 0,
      invoice: 0,
      cashVoucher: 0,
      other: 0
    };
    
    activities.forEach(activity => {
      activity.documents.forEach(document => {
        if (typeCount[document.type] !== undefined) {
          typeCount[document.type] += 1;
        }
      });
    });
    
    return Object.entries(typeCount).map(([name, value]) => ({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      value 
    }));
  }, [activities]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    let totalBeneficiaries = 0;
    let totalDocuments = 0;
    let totalLocations = new Set();
    
    activities.forEach(activity => {
      totalBeneficiaries += activity.beneficiaries.length;
      totalDocuments += activity.documents.length;
      totalLocations.add(activity.location);
    });
    
    return {
      totalActivities: activities.length,
      totalBeneficiaries,
      totalDocuments,
      totalLocations: totalLocations.size
    };
  }, [activities]);

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-ngo-dark mb-6 text-center">
            {t("analytics")}
          </h1>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="text-3xl font-bold text-ngo-green">{stats.totalActivities}</div>
                <div className="text-sm text-gray-600">{t("totalActivities")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="text-3xl font-bold text-ngo-green">{stats.totalBeneficiaries}</div>
                <div className="text-sm text-gray-600">{t("totalBeneficiaries")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="text-3xl font-bold text-ngo-green">{stats.totalDocuments}</div>
                <div className="text-sm text-gray-600">{t("totalDocuments")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="text-3xl font-bold text-ngo-green">{stats.totalLocations}</div>
                <div className="text-sm text-gray-600">{t("uniqueLocations")}</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activities by Month */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{t("activitiesByMonth")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activitiesByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" name={t("activities")} stroke="#2ecc71" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Beneficiaries by Gender */}
            <Card>
              <CardHeader>
                <CardTitle>{t("beneficiariesByGender")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={beneficiariesByGender}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {beneficiariesByGender.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Beneficiaries by Age */}
            <Card>
              <CardHeader>
                <CardTitle>{t("beneficiariesByAge")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={beneficiariesByAge} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name={t("beneficiaries")} fill="#3498db" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Documents by Type */}
            <Card>
              <CardHeader>
                <CardTitle>{t("documentsByType")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={documentsByType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {documentsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
