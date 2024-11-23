import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getiqmahtimingsinhome, getsalahtimingsinhome } from './API/Api';

function SalahAndIqamahTable() {
    const {
        data: iqamahData,
        isLoading: iqamahLoading,
        isError: iqamahError,
    } = useQuery({
        queryKey: ['iqamatimingsinhome'],
        queryFn: getiqmahtimingsinhome,
    });

    const {
        data: salahData,
        isLoading: salahLoading,
        isError: salahError,
    } = useQuery({
        queryKey: ['salahtimingsinhome'],
        queryFn: getsalahtimingsinhome,
    });

    // Helper function to format time (HH:mm) from hours, minutes, and AM/PM
    const formatTime = (hour, minute, amPm) => {
        if (!hour || !minute || !amPm) return '';
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${amPm}`;
    };

    // Helper function to add offset to a given time
    const addOffset = (baseTime, offset) => {
        if (!baseTime || !offset) return baseTime;

        const [hours, minutes] = baseTime.split(':').map(Number);
        const offsetMinutes = Number(offset);

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + offsetMinutes);

        return date.toTimeString().slice(0, 5); // Returns HH:mm format
    };

    // Generate rows for the table
    const generateTableRows = () => {
        if (!salahData || !iqamahData || !salahData.timings || !iqamahData[0]?.times) return [];
    
        const salahTimings = salahData.timings;
        const iqamahTimings = iqamahData[0].times;
    
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    
        return prayers.map((prayer) => {
            const salahTime = salahTimings[prayer];
            const iqamahTimeData = iqamahTimings[prayer]; // Get Iqamah timing data for the prayer
            console.log(iqamahTimeData);
            if (!iqamahTimeData) {
                // Handle case where iqamahTimeData is undefined
                return {
                    prayer: prayer.toUpperCase(),
                    salah: salahTime || '-',
                    iqamah: '-',
                };
            }
    
            let iqamahTime = '';
            if (iqamahTimeData.offset !== undefined && iqamahTimeData.offset !== '') {
                // Add offset to Salah time
                iqamahTime = addOffset(salahTime, iqamahTimeData.offset);
            } else {
                // Use hour, minute, and amPm directly
                iqamahTime = formatTime(
                    iqamahTimeData?.hour,
                    iqamahTimeData?.minute,
                    iqamahTimeData?.amPm
                );
            }
    
            return {
                prayer: prayer.toUpperCase(),
                salah: salahTime || '-',
                iqamah: iqamahTime || '-',
            };
        });
    };
    

    const rows = generateTableRows();

    return (
        <div>
            {iqamahLoading || salahLoading ? (
                <p>Loading...</p>
            ) : iqamahError || salahError ? (
                <p>An error occurred while fetching data.</p>
            ) : (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Prayer</th>
                            <th className="border border-gray-300 p-2">Salah Timings</th>
                            <th className="border border-gray-300 p-2">Iqamah Timings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2 text-center">{row.prayer}</td>
                                <td className="border border-gray-300 p-2 text-center">{row.salah}</td>
                                <td className="border border-gray-300 p-2 text-center">{row.iqamah}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SalahAndIqamahTable;
