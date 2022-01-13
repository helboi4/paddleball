export function clampBallAngle(angle)
{
    if(angle > 150)
    {
        return 150;
    }
    if(angle < 30)
    {
        return 30;
    }
    if(angle <= 90 && angle > 75)
    {
        return 75;
    }
    if(angle >= 90 && angle < 105)
    {
        return 105;
    }
    return angle;
}