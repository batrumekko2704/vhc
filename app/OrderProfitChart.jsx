import {
    useQuery,
} from '@tanstack/react-query'
import {ResponsiveLine} from '@nivo/line'
import dayjs from "dayjs";
import * as constants from "@/app/constants";

export default function OrderProfitChart() {
    const {isPending, error, data: fetchedData} = useQuery({
        queryKey: ['orderProfit'],
        queryFn: () =>
            fetch('/api/order', {
                method: 'POST'
            }).then((res) =>
                res.json(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const profitDateList = []
    const profitList = []

    for (const order of fetchedData) {
        const orderDate = dayjs(order.timestamp).format('MM/YY')
        if (profitDateList.at(-1) !== orderDate) {
            profitDateList.push(orderDate)
            profitList.push(0)
        }
        profitList[profitList.length - 1] += parseFloat(order.total_money)
    }

    const graphData = [{
        "id": "Profit",
        "data": []
    }]
    for (const i in profitDateList) {
        graphData[0].data.push({
            x: profitDateList[i],
            y: profitList[i] / 1000000
        })
    }

    return (
        <ResponsiveLine
            data={graphData}
            colors={{ scheme: constants.colorScheme }}
            margin={{top: 50, right: 110, bottom: 50, left: 60}}
            xScale={{type: 'point'}}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Profit',
                legendOffset: -50,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={10}
            pointColor={{theme: 'background'}}
            pointBorderWidth={2}
            pointBorderColor={{from: 'serieColor'}}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}