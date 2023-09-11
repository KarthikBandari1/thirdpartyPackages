import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {GenderData} = props
  console.log(GenderData)
  return (
    <div>
      <h1>Vaccination by gender</h1>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={GenderData}
            startAngle={180}
            endAngle={0}
            innerRadius="20%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#a44c9e" />
            <Cell name="Female" fill="#b3d23f" />
            <Cell name="Others" fill="#fecba6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByGender
