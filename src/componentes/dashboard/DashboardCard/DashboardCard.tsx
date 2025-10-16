import './DashoardCard.css'
import { Card } from '@mui/material';
export const DashboardCard = ({ svg, title, data, test="" }: { svg: string, title: string, data: number, test:string }) =>

    <Card className='dashboard-item' >
        <img src={`src/assets/${svg}`} alt="ICON" />
        <div className="dashboard-description">
            <h1 data-testid={test}>{data}</h1>
            <h4>{title}</h4>
        </div>
    </Card>