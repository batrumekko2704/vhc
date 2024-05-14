import {
    useQuery,
} from '@tanstack/react-query'
import {ResponsiveTreeMap} from '@nivo/treemap'

export default function CustomerWardChart() {
    const {isPending, error, data: fetchedData} = useQuery({
        queryKey: ['customerWard'],
        queryFn: () =>
            fetch('/api/customer?count&target=ward', {
                method: 'POST'
            }).then((res) =>
                res.json(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const graphData = {
        "name": "Tổng cộng",
        "children": []
    }

    for (const data of fetchedData) {
        graphData.children.push({
            "name": data.ward,
            "total": data._count.ward,
        })
    }

    return (
        <ResponsiveTreeMap
            data={graphData}
            identity="name"
            value="total"
            valueFormat=".02s"
            margin={{top: 10, right: 10, bottom: 10, left: 10}}
            labelSkipSize={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.2
                    ]
                ]
            }}
            parentLabelPosition="left"
            parentLabelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.1
                    ]
                ]
            }}
            label={e => {
                if (e.value >= 3) return `${e.id}: ${e.formattedValue}`
                else return e.formattedValue
            }}
        />
    )
}