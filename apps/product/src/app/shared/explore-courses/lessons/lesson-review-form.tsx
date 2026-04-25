'use client';

import { useState } from 'react';
import { Textarea, Button } from 'rizzui';
import Rate from '@core/ui/rate';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';

type ReviewFormValues = {
  rating: any;
  review: string;
};

export default function LessonReviewForm() {
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<ReviewFormValues> = (data) => {
    console.log(data);
    setReset({ rating: '', review: '' });
  };
  return (
    <Form<ReviewFormValues>
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { rating: '', review: '' },
      }}
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="flex flex-col items-end mt-3 boder border-t border-mainBlue/20 pt-4">
            <Controller
              name="rating"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Rate size="sm" value={value} onChange={onChange} />
              )}
            />
            <Textarea
              placeholder="Comment on this lesson..."
              label="Your Review"
              {...register('review')}
              error={errors.review?.message}
              textareaClassName="h-24"
              className="w-full"
            />
            <Button size="md" className="px-8 ml-auto mt-3" type="submit">
              Submit
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
