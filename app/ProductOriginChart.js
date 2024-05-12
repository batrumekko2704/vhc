import {
    useQuery,
} from '@tanstack/react-query'
import {ResponsiveBar} from '@nivo/bar'
import * as constants from './constants'
const data = [
    {
        "country": "AD",
        "hot dog": 7,
    },
    {
        "country": "AE",
        "hot dog": 19,
    },
]

export default function ProductOriginChart() {

    const {isPending, error, data: fetchedData} = useQuery({
        queryKey: ['productOriginData'],
        queryFn: () =>
            fetch('/api/product', {
                method: 'POST'
            }).then((res) =>
                res.json(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const productOrigin = {}

    for (const product of fetchedData) {
        if (!(product.origin in productOrigin)) {
            productOrigin[product.origin] = 1
        } else productOrigin[product.origin] += 1
    }

    const graphData = []

    for (const origin in productOrigin) {
        graphData.push({
            "origin": origin,
            "Value": productOrigin[origin],
        })
    }

    console.log(graphData)

    return (
        <ResponsiveBar
            data={graphData}
            keys={[
                'Value',
            ]}
            indexBy="origin"
            margin={{top: 50, right: 130, bottom: 50, left: 60}}
            colors={{ scheme: constants.colorScheme }}
            padding={0.3}
            valueScale={{type: 'linear'}}
            indexScale={{type: 'band', round: true}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Origin',
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
                truncateTickAt: 0
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
            ariaLabel="Nivo bar chart demo"
        />
    )
}