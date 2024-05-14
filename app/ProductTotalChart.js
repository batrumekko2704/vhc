import {
    useQuery,
} from '@tanstack/react-query'
import {ResponsiveBar} from '@nivo/bar'
import * as constants from './constants'

export default function ProductTotalChart() {

    const {isPending, error, data: fetchedData} = useQuery({
        queryKey: ['productTotal'],
        queryFn: () =>
            fetch('/api/order?sum&target=total_money&take=10', {
                method: 'POST'
            }).then((res) =>
                res.json(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const graphData = []

    for (const data of fetchedData) {
        console.log(data)
        graphData.push({
            "product_id": data.product_id,
            "Value": data._sum.total_money,
        })
    }

    return (
        <ResponsiveBar
            data={graphData}
            keys={[
                'Value',
            ]}
            indexBy="product_id"
            margin={{top: 50, right: 130, bottom: 50, left: 60}}
            colors={{scheme: constants.colorScheme}}
            padding={0.3}
            valueScale={{type: 'linear'}}
            indexScale={{type: 'band', round: true}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Product ID',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Value',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0,
                format: (e => {
                    return e / 1000000
                })
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            label={e => {
                return Math.round(e.value / 1000) / 1000
            }}
        />
    )
}