from fastapi import APIRouter, HTTPException, Query

router = APIRouter()


@router.get("/")
async def list_appointments(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.post("/", status_code=201)
async def create_appointment():
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{appointment_id}")
async def get_appointment(appointment_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.put("/{appointment_id}")
async def update_appointment(appointment_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.delete("/{appointment_id}", status_code=204)
async def delete_appointment(appointment_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")
