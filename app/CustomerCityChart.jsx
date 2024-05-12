import {
    useQuery,
} from '@tanstack/react-query'
import {ResponsivePie} from '@nivo/pie'
import dayjs from "dayjs";
import * as constants from "@/app/constants";

const data = [
    {
        "id": "ruby",
        "value": 315,
    },
    {
        "id": "rust",
        "value": 340,
    },
    {
        "id": "scala",
        "value": 541,
    },
    {
        "id": "hack",
        "value": 146,
    },
    {
        "id": "haskell",
        "value": 581,
    }
]

export default function CustomerCityChart() {
    const {isPending, error, data: fetchedData} = useQuery({
        queryKey: ['customerData'],
        queryFn: () =>
            fetch('/api/customer', {
                method: 'POST'
            }).then((res) =>
                res.json(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const customerCity = {}

    for (const customer of fetchedData) {
        if (!(customer.city in customerCity)) {
            customerCity[customer.city] = 1
        } else customerCity[customer.city] += 1
    }

    const graphData = []

    // Create sortedCustomerCity array
    const sortedCustomerCity = Object.keys(customerCity).map(function (key) {
        return [key, customerCity[key]];
    });

    // Sort the array based on the second element
    sortedCustomerCity.sort(function (first, second) {
        return second[1] - first[1];
    });

    for (const i in sortedCustomerCity) {
        graphData.push({
            "id": sortedCustomerCity[i][0],
            "value": sortedCustomerCity[i][1],
        })
    }

    return (
        <ResponsivePie
            data={graphData}
            colors={{ scheme: constants.colorScheme }}
            margin={{top: 40, right: 80, bottom: 70, left: 0}}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{from: 'color'}}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 80,
                    translateY: 0,
                    itemsSpacing: 10,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}