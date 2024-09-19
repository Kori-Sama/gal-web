"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InviteKeyType } from "@/lib/types";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const KeyGen = () => {
  const [keys, setKeys] = useState<InviteKeyType[]>([]);
  const [copiedId, setCopiedId] = useState<number>(0);

  useEffect(() => {
    fetch("/api/gen-key")
      .then(res => res.json())
      .then(data => {
        setKeys(data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Card className="flex flex-col bg-secondary px-4 pt-6">
      <CardTitle className="mb-6">生成邀请码</CardTitle>
      <CardContent>
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={async () => {
            const res = await fetch("/api/gen-key", {
              method: "POST",
            });

            const obj = await res.json();
            if (!res.ok) {
              console.error("Failed to generate key", obj.message);
              return;
            }

            setKeys([obj.data, ...keys]);
          }}
        >
          生成
        </Button>
        <div className="mt-6 flex flex-col gap-4">
          {keys.length !== 0 &&
            keys.map(key => (
              <div key={key.id} className="flex flex-col justify-center">
                <div className="flex gap-4">
                  <Input type="text" defaultValue={key.key} readOnly />
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      navigator.clipboard.writeText(key.key);
                      setCopiedId(key.id);
                    }}
                  >
                    {copiedId === key.id ? <Check /> : <Copy />}
                  </Button>
                </div>
                <div className="mt-1 flex justify-between">
                  <Label className="ml-4">
                    生成时间:{" "}
                    {dayjs(key.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </Label>
                  <Label className="mr-16">
                    {key.invitedUser === null
                      ? "未被使用"
                      : `邀请用户: ${key.invitedUser.qqNumber}`}
                  </Label>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyGen;
